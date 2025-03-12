package org.learning.dlearning_backend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PaymentMethodName;
import org.learning.dlearning_backend.common.PaymentStatus;
import org.learning.dlearning_backend.dto.request.BuyCourseRequest;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.CourseChapterAndLessonMapper;
import org.learning.dlearning_backend.mapper.CourseMapper;
import org.learning.dlearning_backend.mapper.EnrollmentMapper;
import org.learning.dlearning_backend.model.*;
import org.learning.dlearning_backend.repository.*;
import org.learning.dlearning_backend.service.CourseService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseMapper courseMapper;
    private final CloudinaryService cloudinaryService;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final CourseChapterAndLessonMapper courseChapterAndLessonMapper;
    private final PaymentMethodRepository paymentMethodRepository;
    private final PaymentRepository paymentRepository;
    private final ElasticsearchTemplate elasticsearchTemplate;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final SearchRepository searchRepository;
    private static final String PRODUCT_CACHE_KEY = "course_list";


    @Transactional
    @Override
    public CourseCreationResponse createCourse(CourseCreationRequest request, MultipartFile file, MultipartFile video) throws IOException {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Course course = courseMapper.toCourse(request);

        String urlThumbnail = cloudinaryService.uploadImage(file);
        if (video != null) {
            String videoUrl = cloudinaryService.uploadVideo(video, "courses").get("url").toString();
            course.setVideoUrl(videoUrl);
        }
        course.setThumbnail(urlThumbnail);
        course.setAuthor(user);
        courseRepository.save(course);

        CourseElasticSearch courseElasticSearch = CourseElasticSearch.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .author(course.getAuthor().getFullName())
                .thumbnail(course.getThumbnail())
                .quantity(course.getQuantity())
                .points(course.getPoints())
                .language(course.getLanguage())
                .courseLevel(course.getCourseLevel())
                .duration(course.getDuration())
                .build();
        log.info("Course {} is saved to elastic search", courseElasticSearch);
        kafkaTemplate.send("save-to-elastic-search", courseElasticSearch);
        return courseMapper.toCourseCreationResponse(course);
    }

    public PageResponse<CourseResponse> getAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Course> courses = courseRepository.findAll(pageable);
        List<CourseResponse> courseResponses = courses.getContent().stream().map(courseMapper::toCourseResponse).toList();

        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(courses.getTotalElements())
                .totalPages(courses.getTotalPages())
                .result(courseResponses)
                .build();

    }

    @Override
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        double averageRating = 4.5;
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .thumbnail(course.getThumbnail())
                .videoUrl(course.getVideoUrl())
                .author(course.getAuthor().getFullName())
                .duration(course.getDuration())
                .language(course.getLanguage())
                .courseLevel(course.getCourseLevel())
                .points(course.getPoints())
                .averageRating(averageRating)
                .build();

    }

    @Override
    public BuyCourseResponse buyCourse(BuyCourseRequest request) {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Course course = courseRepository.findById(request.getCourseId()).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new AppException(ErrorCode.COURSE_ALREADY_PURCHASED);
        }

        Long pointsCourse = Objects.requireNonNull(course.getPoints(), "Course points cannot be null");
        Long pointsUser = Objects.requireNonNull(user.getPoints(), "User points cannot be null");

        if (pointsUser < pointsCourse) {
            throw new AppException(ErrorCode.NOT_ENOUGH_POINTS);
        }
        user.setPoints(pointsUser - pointsCourse);
        course.setQuantity(course.getQuantity() + 1);
        userRepository.save(user);

        //cộng tiền vào account author
        User authorCourse = course.getAuthor();
        Long pointsAuthor = Objects.requireNonNull(authorCourse.getPoints(), "Author points cannot be null");
        authorCourse.setPoints(pointsAuthor + pointsCourse);
        userRepository.save(authorCourse);
        //payment
        PaymentMethod paymentMethod = paymentMethodRepository.findByMethodName(PaymentMethodName.BANK_TRANSFER)
                .orElseGet(() -> paymentMethodRepository.save(
                        PaymentMethod.builder()
                                .methodName(PaymentMethodName.BANK_TRANSFER)
                                .build()
                ));

        Payment payment = Payment.builder()
                .user(user)
                .course(course)
                .paymentMethod(paymentMethod)
                .price(BigDecimal.valueOf(pointsCourse * 100))
                .paymentStatus(PaymentStatus.SUCCESS)
                .build();

        paymentRepository.save(payment);

        Enrollment enrollment = Enrollment.builder()
                .course(course)
                .user(user)
                .purchased(true)
                .build();

        enrollmentRepository.save(enrollment);

        return enrollmentMapper.toBuyCourseResponse(enrollment);
    }

    @Override
    public CourseChapterResponse getInfoCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        Long totalLessons = course.getChapters().stream().mapToLong(chapter -> chapter.getLessons().size()).sum();

        CourseChapterResponse courseLessonResponse = courseChapterAndLessonMapper.getCourseChapterAndLesson(courseId);

        Set<CourseChapterResponse.ChapterDto> sortedChapter = courseLessonResponse.getChapters().stream()
                .sorted(Comparator.comparing(CourseChapterResponse.ChapterDto::getChapterId))
                .peek(chapter -> {
                    Set<CourseChapterResponse.LessonDto> sortedLesson = chapter.getLessonDto().stream()
                            .sorted(Comparator.comparing(CourseChapterResponse.LessonDto::getLessonId))
                            .collect(Collectors.toCollection(LinkedHashSet::new));
                    chapter.setLessonDto(sortedLesson);
                })
                .collect(Collectors.toCollection(LinkedHashSet::new));

        courseLessonResponse.setTotalLesson(totalLessons);
        courseLessonResponse.setChapters(sortedChapter);

        return courseLessonResponse;
    }

    @Override
    public PageResponse<CourseElasticSearch> searchCourse(String keyword, int page, int size) {
        NativeQuery nativeQuery;
        if (keyword == null || keyword.isBlank()) {
            nativeQuery = NativeQuery.builder()
                    .withQuery(q -> q.matchAll(m -> m))
                    .withPageable(PageRequest.of(page - 1, size))
                    .build();
        } else {
            nativeQuery = NativeQuery.builder()
                    .withQuery(q -> q.bool(b -> b
                            .should(s -> s.match(m -> m.field("title").query(keyword)
                                    .fuzziness("AUTO")
                                    .minimumShouldMatch("70%")
                                    .boost(2.0F))
                            ).should(s -> s.match(m -> m.field("description").query(keyword)
                                    .fuzziness("AUTO")
                                    .minimumShouldMatch("70%")
                                    .boost(2.0F))
                            ).should(s -> s.match(m -> m.field("author").query(keyword)
                                    .fuzziness("AUTO")
                                    .minimumShouldMatch("70%")
                                    .boost(2.0F))
                            ))).withPageable(PageRequest.of(page - 1, size))
                    .build();
        }
        SearchHits<CourseElasticSearch> searchHits = elasticsearchTemplate.search(nativeQuery, CourseElasticSearch.class);
        long totalElement = searchHits.getTotalHits();
        return PageResponse.<CourseElasticSearch>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(totalElement)
                .totalPages((int) Math.ceil(totalElement / (double) size))
                .result(searchHits.getSearchHits().stream().map(SearchHit::getContent).toList())
                .build();
    }

    @Override
    public void sysDataToElasticSearch() {
        List<CourseElasticSearch> courseElasticSearches = courseRepository.findAll().stream()
                .map(course -> CourseElasticSearch.builder()
                        .id(course.getId())
                        .title(course.getTitle())
                        .description(course.getDescription())
                        .author(course.getAuthor().getFullName())
                        .thumbnail(course.getThumbnail())
                        .quantity(course.getQuantity())
                        .points(course.getPoints())
                        .language(course.getLanguage())
                        .courseLevel(course.getCourseLevel())
                        .duration(course.getDuration())
                        .videoUrl(course.getVideoUrl())
                        .build())
                .toList();
        courseElasticSearches.forEach(courseElasticSearch -> kafkaTemplate.send("save-to-elastic-search", courseElasticSearch));
    }

    @Override
    public PageResponse<CourseResponse> getCoursesCache(int page, int size) throws JsonProcessingException {
        String cacheKey = PRODUCT_CACHE_KEY + "_page_" + page + "_size_" + size;
        Object cachedData = redisTemplate.opsForValue().get(cacheKey);
        String totalCountKey = PRODUCT_CACHE_KEY + "_totalCount"; // Cache tổng số phần tử    Integer totalElements;
        Integer totalElements;
        Object cachedTotalElements = redisTemplate.opsForValue().get(totalCountKey);
        List<CourseResponse> courses;
        log.info("cachedData: {}", cachedData);
        if (cachedData == null || cachedTotalElements == null) {
            log.info("Get data from database");
            Page<Course> coursePage = courseRepository.findAll(PageRequest.of(page - 1, size, Sort.by("createdAt").ascending()));
            courses = coursePage.getContent().stream().map(courseMapper::toCourseResponse).toList();
            totalElements = (int) coursePage.getTotalElements();
            // Lưu danh sách courses và tổng số phần tử vào Redis (TTL 10 phút)
            redisTemplate.opsForValue().set(cacheKey, courses, Duration.ofMinutes(10));
            redisTemplate.opsForValue().set(totalCountKey, totalElements, Duration.ofMinutes(10));
        } else {
            // Chan đổi từ JSON String sang List<Course>
            log.info("Get data from cache");
            courses = objectMapper.convertValue(cachedData, new TypeReference<List<CourseResponse>>() {});
            totalElements = (Integer) cachedTotalElements;
        }
        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(totalElements)
                .totalPages((int) Math.ceil(totalElements / (double) size))
                .result(courses)
                .build();
    }

    @Override
    public PageResponse<CourseResponse> getCourseWithSortMultiFieldAndSearch(int page, int size, String sortBy, String... search) {
        return searchRepository.getCourseWithSortMultiFieldAndSearch(page, size, sortBy, search);
    }

    @Override
    public PageResponse<CourseResponse> getCourseWithSortAndSpecification(int page, int size, String sortBy, String[] search) {
       return searchRepository.getCourseWithSortAndSearchSpecification(page, size, sortBy, search);
    }

    @Override
    public PageResponse<CourseResponse> findCourseByOldest(int page, int size) {
        String cacheKey = PRODUCT_CACHE_KEY + "_page_" + page + "_size_" + size;
        List<CourseResponse> courses;
        Object cachedData = redisTemplate.opsForValue().get(cacheKey);
        String totalCountKey = PRODUCT_CACHE_KEY + "_totalCount"; // Cache tổng số phần tử    Integer totalElements;
        Integer totalElements;
        Object cachedTotalElements = redisTemplate.opsForValue().get(totalCountKey);
        if (cachedData == null || cachedTotalElements == null) {
            log.info("Get data from database");
            Page<Course> coursePage = courseRepository.findAll(PageRequest.of(page - 1, size, Sort.by("createdAt").ascending()));
            courses = coursePage.getContent().stream().map(courseMapper::toCourseResponse).toList();
            totalElements = (int) coursePage.getTotalElements();
            // Lưu danh sách courses và tổng số phần tử vào Redis (TTL 10 phút)
            redisTemplate.opsForValue().set(cacheKey, courses, Duration.ofMinutes(10));
            redisTemplate.opsForValue().set(totalCountKey, totalElements, Duration.ofMinutes(10));
        } else {
            log.info("Get data from cache");
            courses = objectMapper.convertValue(cachedData, new TypeReference<List<CourseResponse>>() {});
            totalElements = (Integer) cachedTotalElements;

        }
        courses.sort(Comparator.comparing(CourseResponse::getCreatedAt));
        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(totalElements)
                .totalPages((int) Math.ceil(courses.size() / (double) size))
                .result(courses)
                .build();

    }

    @Override
    public PageResponse<CourseResponse> findCourseByNewest(int page, int size) {
        String cacheKey = PRODUCT_CACHE_KEY + "_page_" + page + "_size_" + size;
        List<CourseResponse> courses;
        Object cachedData = redisTemplate.opsForValue().get(cacheKey);
        String totalCountKey = PRODUCT_CACHE_KEY + "_totalCount"; // Cache tổng số phần tử    Integer totalElements;
        Integer totalElements;
        Object cachedTotalElements = redisTemplate.opsForValue().get(totalCountKey);
        if (cachedData == null || cachedTotalElements == null) {
            log.info("Get data from database");
            Page<Course> coursePage = courseRepository.findAll(PageRequest.of(page - 1, size, Sort.by("createdAt").ascending()));
            courses = coursePage.getContent().stream().map(courseMapper::toCourseResponse).toList();
            totalElements = (int) coursePage.getTotalElements();
            // Lưu danh sách courses và tổng số phần tử vào Redis (TTL 10 phút)
            redisTemplate.opsForValue().set(cacheKey, courses, Duration.ofMinutes(10));
            redisTemplate.opsForValue().set(totalCountKey, totalElements, Duration.ofMinutes(10));
        } else {
            log.info("Get data from cache");
            courses = objectMapper.convertValue(cachedData, new TypeReference<List<CourseResponse>>() {});
            totalElements = (Integer) cachedTotalElements;

        }
        courses.sort(Comparator.comparing(CourseResponse::getCreatedAt).reversed());
        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(totalElements)
                .totalPages((int) Math.ceil(courses.size() / (double) size))
                .result(courses)
                .build();
    }




}
