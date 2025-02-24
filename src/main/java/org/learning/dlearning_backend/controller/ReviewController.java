package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.ReviewLessonRequest;
import org.learning.dlearning_backend.dto.request.ReviewRequest;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.ReviewLessonResponse;
import org.learning.dlearning_backend.dto.response.ReviewResponse;
import org.learning.dlearning_backend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/reviewByCourse/{id}")
    public ResponseData<List<ReviewResponse>> getReviewByCourse(@PathVariable Long id){
        return ResponseData.<List<ReviewResponse>>builder()
                .data(reviewService.getReviewByCourse(id))
                .message("Get review by course successfully")
                .code(200)
                .build();
    }
    @PostMapping("/add-review")
    public ResponseData<ReviewResponse> addReview(@RequestBody ReviewRequest request){
        return ResponseData.<ReviewResponse>builder()
                .data(reviewService.addReview(request))
                .message("Add review successfully")
                .code(200)
                .build();
    }
    @GetMapping("/reviewByLesson/{id}")
    public ResponseData<List<ReviewLessonResponse>> getReviewByLesson(@PathVariable Long id){
        return ResponseData.<List<ReviewLessonResponse>>builder()
                .data(reviewService.getReviewByLesson(id))
                .message("Get review by lesson successfully")
                .code(200)
                .build();
    }
    @PostMapping("/add-review-lesson")
    public ResponseData<ReviewLessonResponse> addReview(@RequestBody ReviewLessonRequest request){
        return ResponseData.<ReviewLessonResponse>builder()
                .data(reviewService.addReviewLesson(request))
                .message("Add review successfully")
                .code(200)
                .build();
    }
}
