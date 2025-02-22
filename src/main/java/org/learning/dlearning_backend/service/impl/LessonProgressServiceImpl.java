package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.UserCompletionResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.LessonProgress;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.*;
import org.learning.dlearning_backend.service.LessonProgressService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LessonProgressServiceImpl implements LessonProgressService {
    private final LessonProgressRepository lessonProgressRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    public UserCompletionResponse calculateUserCompletion(Long courseId) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        if(!enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new AppException(ErrorCode.COURSE_ACCESS_DENIED);
        }

        int totalLessons = course.getChapters().stream().mapToInt(chapter -> chapter.getLessons().size()).sum();

        long completedLessons = lessonProgressRepository.countByUserAndCourseAndCompleted(user, course, true);

        if(totalLessons == 0) {
            return UserCompletionResponse.builder()
                    .totalLessonComplete(0L)
                    .completionPercentage(BigDecimal.ZERO)
                    .totalLessonComplete(0L)
                    .build();
        }

        List<LessonProgress> lessonProgresses = lessonProgressRepository.findByUserAndCourse(user, course, true);

        List<UserCompletionResponse.LessonComplete> lessonCompleteList = new ArrayList<>();
        if(!lessonProgresses.isEmpty()){
            lessonCompleteList = lessonProgresses.stream()
                    .map(lessonProgress -> UserCompletionResponse.LessonComplete.builder()
                            .lessonId(lessonProgress.getLesson().getId())
                            .lessonName(lessonProgress.getLesson().getLessonName())
                            .build()).toList();
        }
        BigDecimal completed = BigDecimal.valueOf(completedLessons);
        BigDecimal total = BigDecimal.valueOf(totalLessons);
        BigDecimal percentage = completed.divide(total, 3, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP);

        return UserCompletionResponse.builder()
                .totalLessonComplete(completedLessons)
                .totalLessons((long)totalLessons)
                .completionPercentage(percentage)
                .lessonCompletes(lessonCompleteList)
                .build();
    }

}
