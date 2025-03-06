package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.ReviewLessonRequest;
import org.learning.dlearning_backend.dto.request.ReviewRequest;
import org.learning.dlearning_backend.dto.request.UpdateReviewRequest;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.ReviewLessonResponse;
import org.learning.dlearning_backend.dto.response.ReviewResponse;
import org.learning.dlearning_backend.dto.response.UpdateReviewResponse;
import org.learning.dlearning_backend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;


    @Operation(summary = "Get review By Course", description = "Get review By Course")
    @ApiResponse(responseCode = "200", description = "Get review By Course successfully",
            content = @Content(schema = @Schema(implementation = ReviewResponse.class))
    )
    @GetMapping("/reviewByCourse/{id}")
    public ResponseData<List<ReviewResponse>> getReviewByCourse(@PathVariable Long id){
        return ResponseData.<List<ReviewResponse>>builder()
                .data(reviewService.getReviewByCourse(id))
                .message("Get review by course successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Add review", description = "Add review")
    @ApiResponse(responseCode = "200", description = "Add review successfully",
            content = @Content(schema = @Schema(implementation = ReviewResponse.class))
    )
    @PostMapping("/add-review")
    public ResponseData<ReviewResponse> addReview(@RequestBody ReviewRequest request){
        return ResponseData.<ReviewResponse>builder()
                .data(reviewService.addReview(request))
                .message("Add review successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Get review By Lesson", description = "Get review By Lesson")
    @ApiResponse(responseCode = "200", description = "Get review By Lesson successfully",
            content = @Content(schema = @Schema(implementation = ReviewLessonResponse.class))
    )
    @GetMapping("/reviewByLesson/{id}")
    public ResponseData<List<ReviewLessonResponse>> getReviewByLesson(@PathVariable Long id){
        return ResponseData.<List<ReviewLessonResponse>>builder()
                .data(reviewService.getReviewByLesson(id))
                .message("Get review by lesson successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Add review", description = "Add review")
    @ApiResponse(responseCode = "200", description = "Add review successfully",
            content = @Content(schema = @Schema(implementation = ReviewLessonResponse.class))
    )
    @PostMapping("/add-review-lesson")
    public ResponseData<ReviewLessonResponse> addReview(@RequestBody ReviewLessonRequest request){
        return ResponseData.<ReviewLessonResponse>builder()
                .data(reviewService.addReviewLesson(request))
                .message("Add review successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Update review", description = "Update review")
    @ApiResponse(responseCode = "200", description = "Update review successfully",
            content = @Content(schema = @Schema(implementation = UpdateReviewResponse.class))
    )
    @PutMapping("/update-review/{id}")
    public ResponseData<UpdateReviewResponse> updateReview(@RequestBody UpdateReviewRequest request, @PathVariable Long id){
        return ResponseData.<UpdateReviewResponse>builder()
                .data(reviewService.updateReview(id, request))
                .message("Update review successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Delete review", description = "Delete review")
    @ApiResponse(responseCode = "200", description = "Delete review successfully",
            content = @Content(schema = @Schema(implementation = Void.class))
    )
    @DeleteMapping("/delete-review/{id}")
    public ResponseData<Void> deleteReview(@PathVariable Long id){
        reviewService.deleteReview(id);
        return ResponseData.<Void>builder()
                .message("Delete review successfully")
                .code(200)
                .build();
    }
}
