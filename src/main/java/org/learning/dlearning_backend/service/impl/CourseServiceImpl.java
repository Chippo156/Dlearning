package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.CourseCreationResponse;
import org.learning.dlearning_backend.dto.response.CourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.CourseMapper;
import org.learning.dlearning_backend.mapper.UserMapper;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.CourseService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseMapper courseMapper;
    private final CloudinaryService cloudinaryService;

    @Transactional
    @Override
    public CourseCreationResponse createCourse(CourseCreationRequest request, MultipartFile file, MultipartFile video) throws IOException {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
//        if(!Objects.equals(user.getRole().getName(), PredefinedRole.TEACHER_ROLE))
//            throw new AppException(ErrorCode.ACCESS_DENIED);
        Course course = courseMapper.toCourse(request);

        String urlThumbnail = cloudinaryService.uploadImage(file);
        if(video != null){
            String videoUrl = cloudinaryService.uploadVideo(video, "courses").get("url").toString();
            course.setVideoUrl(videoUrl);
        }
        course.setThumbnail(urlThumbnail);
        course.setAuthor(user);
        courseRepository.save(course);
        return courseMapper.toCourseCreationResponse(course);
    }

    public PageResponse<CourseResponse> getAllCourses(int page, int size){
        Pageable pageable = PageRequest.of(page-1, size);

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

}
