package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.LessonProgressRequest;
import org.learning.dlearning_backend.dto.response.LessonProgressResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserCompletionResponse;
import org.learning.dlearning_backend.service.LessonProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/lesson-progress")
public class LessonProgressController {

    private final LessonProgressService lessonProgressService;


    @Operation(summary = "Calculate user completion for a course",description = "Calculate user completion for a course")
    @ApiResponse(responseCode = "200", description = "User completion calculated successfully",
          content = @Content(schema = @Schema(implementation = UserCompletionResponse.class))
    )
    @GetMapping("/calculate-completion/{courseId}")
    public ResponseData<UserCompletionResponse> calculateCompletion(@PathVariable Long courseId) {

        return ResponseData.<UserCompletionResponse>builder()
                .code(HttpStatus.OK.value())
                .message("User completion calculated successfully")
                .data(lessonProgressService.calculateUserCompletion(courseId))
                .build();
    }

    @Operation(summary = "Mark lesson as complete",description = "Mark lesson as complete")
    @ApiResponse(responseCode = "200", description = "Lesson marked as complete successfully",
          content = @Content(schema = @Schema(implementation = LessonProgressResponse.class))
    )
    @PostMapping("/mark-lesson-as-complete")
    public ResponseData<LessonProgressResponse> markLessonAsComplete(@RequestBody LessonProgressRequest request) {

        return ResponseData.<LessonProgressResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson marked as complete successfully")
                .data(lessonProgressService.markLessonAsComplete(request))
                .build();
    }
}
