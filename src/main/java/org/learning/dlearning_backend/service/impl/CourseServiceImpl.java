package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.request.BuyCourseRequest;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.CourseChapterAndLessonMapper;
import org.learning.dlearning_backend.mapper.CourseMapper;
import org.learning.dlearning_backend.mapper.EnrollmentMapper;
import org.learning.dlearning_backend.mapper.UserMapper;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Enrollment;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.EnrollmentRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.CourseService;
import org.learning.dlearning_backend.service.EnrollmentService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Transactional
    @Override
    public CourseCreationResponse createCourse(CourseCreationRequest request, MultipartFile file, MultipartFile video) throws IOException {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
//        if(!Objects.equals(user.getRole().getName(), PredefinedRole.TEACHER_ROLE))
//            throw new AppException(ErrorCode.ACCESS_DENIED);
        Course course = courseMapper.toCourse(request);

        String urlThumbnail = cloudinaryService.uploadImage(file);
        if (video != null) {
            String videoUrl = cloudinaryService.uploadVideo(video, "courses").get("url").toString();
            course.setVideoUrl(videoUrl);
        }
        course.setThumbnail(urlThumbnail);
        course.setAuthor(user);
        courseRepository.save(course);
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
        User authorCourse  = course.getAuthor();
        authorCourse.setPoints(authorCourse.getPoints() + pointsCourse);

        //payment

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

}
