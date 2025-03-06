package org.learning.dlearning_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.ChapterCreationRequest;
import org.learning.dlearning_backend.dto.response.ChapterCreationResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.service.ChapterService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/chapter")
public class ChapterController {
    private final ChapterService chapterService;
    @PostMapping("/create")
    public ResponseData<ChapterCreationResponse> createChapter(@Valid @RequestBody ChapterCreationRequest request) {
        return ResponseData.<ChapterCreationResponse>builder()
                .data(chapterService.createChapter(request))
                .message("Chapter created successfully")
                .code(HttpStatus.CREATED.value())
                .build();
    }

}
