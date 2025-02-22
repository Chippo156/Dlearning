package org.learning.dlearning_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.LessonCreationRequest;
import org.learning.dlearning_backend.dto.request.UpdateLessonRequest;
import org.learning.dlearning_backend.dto.response.LessonCreationResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UpdateLessonResponse;
import org.learning.dlearning_backend.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/lessons")
public class LessonController {
    private final LessonService lessonService;

    @PostMapping("/create-lesson")
    public ResponseData<LessonCreationResponse> createLesson(@Valid @RequestPart("request") LessonCreationRequest request,
                                                             @RequestPart("video") MultipartFile file) throws Exception {

        return ResponseData.<LessonCreationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson created successfully")
                .data(lessonService.createLesson(request, file))
                .build();
    }

    @PostMapping("/update-lesson")
    public ResponseData<UpdateLessonResponse> updateLesson(@Valid @RequestPart("request") UpdateLessonRequest request,
                                                           @RequestPart("video") MultipartFile file) throws Exception {

        return ResponseData.<UpdateLessonResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson updated successfully")
                .data(lessonService.updateLesson(request, file))
                .build();
    }

    @DeleteMapping("/delete-lesson/{lessonId}")
    public ResponseData<Void> deleteLesson(@PathVariable Long lessonId) throws Exception {
        lessonService.deleteLesson(lessonId);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson deleted successfully")
                .build();
    }

}
