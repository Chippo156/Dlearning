package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserCompletionResponse;
import org.learning.dlearning_backend.service.LessonProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/lesson-progress")
public class LessonProgressController {

    private final LessonProgressService lessonProgressService;

    @GetMapping("/calculate-completion/{courseId}")
    public ResponseData<UserCompletionResponse> calculateCompletion(@PathVariable Long courseId) {

        return ResponseData.<UserCompletionResponse>builder()
                .code(HttpStatus.OK.value())
                .message("User completion calculated successfully")
                .data(lessonProgressService.calculateUserCompletion(courseId))
                .build();
    }
}
