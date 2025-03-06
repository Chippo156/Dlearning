package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.response.InfoTeacherByCourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.StudentResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Enrollment;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.EnrollmentRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.TeacherService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeacherServiceImpl implements TeacherService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;


    @Override
    public InfoTeacherByCourseResponse getInfoTeacherByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        User user = course.getAuthor();
        int totalReview = courseRepository.totalReview(user.getId());
        int totalStudent = enrollmentRepository.totalStudentsByTeacher(course.getAuthor().getId());
        int totalCourse = user.getCourses().size();

        return InfoTeacherByCourseResponse.builder()
                .name(course.getAuthor().getFullName())
                .avatar(course.getAuthor().getAvatar())
                .userId(user.getId())
                .avgRating(avgRating(user))
                .courseAmount(totalCourse)
                .reviewAmount(totalReview)
                .studentAmount(totalStudent)
                .description(user.getDescription())
                .build();
    }

    @Override
    public PageResponse<StudentResponse> getStudentByPurchasedCourse(int page, int size) {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        if(!Objects.equals(user.getRole().getName(), PredefinedRole.TEACHER_ROLE)){
            throw new AppException(ErrorCode.ACCESS_DENIED);
        }
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Enrollment> enrollments = enrollmentRepository.findPurchaseUsersByTeacherId(user.getId(), pageable);

        return PageResponse.<StudentResponse>builder()
                .pageSize(size)
                .currentPage(page)
                .totalElements(enrollments.getTotalElements())
                .totalPages(enrollments.getTotalPages())
                .result(enrollments.getContent().stream().map(enrollment -> StudentResponse.builder()
                        .courseName(enrollment.getCourse().getTitle())
                        .email(enrollment.getUser().getEmail())
                        .avatar(enrollment.getUser().getAvatar())
                        .createAt(enrollment.getCreatedAt())
                        .name(enrollment.getUser().getFullName())
                        .build()).toList())
                .build();
    }

    @Override
    public BigDecimal avgRating(User user) {
           long countRating = user.getReviews().stream().filter(review -> review.getRating() != 0)
                   .count();
           BigDecimal totalRating = user.getReviews().stream().filter(review -> review.getRating() != 0)
                   .map(review -> BigDecimal.valueOf(review.getRating()))
                   .reduce(BigDecimal.ZERO, BigDecimal::add);

           return countRating > 0 ? totalRating.divide(BigDecimal.valueOf(countRating), 1, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }
}
