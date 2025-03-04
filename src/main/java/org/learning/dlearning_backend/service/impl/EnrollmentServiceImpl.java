package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.request.IsCourseCompleteRequest;
import org.learning.dlearning_backend.dto.response.BuyCourseResponse;
import org.learning.dlearning_backend.dto.response.CoursePurchaseResponse;
import org.learning.dlearning_backend.dto.response.IsCompletionCourseResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.EnrollmentMapper;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Enrollment;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.EnrollmentRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.EnrollmentService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentMapper enrollmentMapper;


    @Override
    public List<BuyCourseResponse> getCourseByUserCurrent() {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        List<Enrollment> enrollments = enrollmentRepository.findCourseByUser(user);

        return enrollments.stream().map(enrollmentMapper::toBuyCourseResponse).toList();
    }

    @Override
    public CoursePurchaseResponse checkCoursePurchase(Long courseId) {
        if (courseId <= 0) {
            throw new AppException(ErrorCode.INVALID_PATH_VARIABLE_ID);
        }
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Course course = courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        if (Objects.equals(user.getRole().getName(), PredefinedRole.ADMIN_ROLE)) {
            return CoursePurchaseResponse.builder()
                    .purchased(true)
                    .courseId(course.getId())
                    .userId(user.getId())
                    .build();
        }

        Optional<Enrollment> enrollment = enrollmentRepository.checkPurchase(user, course);

        if (enrollment.isEmpty()) {
            return CoursePurchaseResponse.builder()
                    .purchased(false)
                    .courseId(course.getId())
                    .userId(user.getId())
                    .build();
        }
        return enrollmentMapper.toCoursePurchaseResponse(enrollment.get());
    }
    public IsCompletionCourseResponse isCompleteCourse(IsCourseCompleteRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        return IsCompletionCourseResponse.builder()
                .isComplete(enrollmentRepository.isCourseCompleteByUser(user, course))
                .build();
    }
}
