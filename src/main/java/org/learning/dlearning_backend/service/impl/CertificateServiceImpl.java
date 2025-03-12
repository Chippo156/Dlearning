package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CertificateCreationEvent;
import org.learning.dlearning_backend.dto.response.CertificateResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Enrollment;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.*;
import org.learning.dlearning_backend.service.CertificateService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class CertificateServiceImpl implements CertificateService {
    private final CertificateRepository certificateRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final EnrollmentRepository enrollmentRepository;


    @Override
    public void createCertificate(CertificateCreationEvent event) {
        Course course = courseRepository.findById(event.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

//        long totalLesson = course.getChapters().stream().mapToLong(chapter -> chapter.getLessons().size()).sum();
        if (!enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new AppException(ErrorCode.COURSE_NOT_PURCHASED);
        }
//        if (lessonProgressRepository.totalLessonComplete(user, course) < totalLesson) {
//            throw new AppException(ErrorCode.INCOMPLETE_LESSONS);
//        }
        if (certificateRepository.existsByCourseAndUser(course, user)) {
            throw new AppException(ErrorCode.CERTIFICATE_EXISTED);
        }
        Enrollment enrollment = enrollmentRepository.findByCourseAndUser(course, user)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_PURCHASED));
        enrollment.setComplete(true);
        enrollmentRepository.save(enrollment);

        CertificateCreationEvent creationEvent = new CertificateCreationEvent(user.getId(),event.getCourseId());

        kafkaTemplate.send("create-certificate", creationEvent);
        log.info("Send event create certificate for user: {} and course: {}", user.getId(), event.getCourseId());
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public List<CertificateResponse> getCertificateByCurrentLogin() {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        return certificateRepository.findByUser(user).stream().map(
                certificate -> CertificateResponse.builder()
                        .certificateId(certificate.getId())
                        .author(certificate.getCourse().getAuthor().getFullName())
                        .username(user.getFullName())
                        .courseName(certificate.getCourse().getTitle())
                        .certificateUrl(certificate.getCertificateUrl())
                        .email(user.getEmail())
                        .issueDate(certificate.getIssueDate())
                        .build()).toList();
    }
}
