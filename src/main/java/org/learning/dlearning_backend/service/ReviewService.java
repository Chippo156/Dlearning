package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.ReviewLessonRequest;
import org.learning.dlearning_backend.dto.request.ReviewRequest;
import org.learning.dlearning_backend.dto.request.UpdateReviewRequest;
import org.learning.dlearning_backend.dto.response.DeleteCommentResponse;
import org.learning.dlearning_backend.dto.response.ReviewLessonResponse;
import org.learning.dlearning_backend.dto.response.ReviewResponse;
import org.learning.dlearning_backend.dto.response.UpdateReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getReviewByCourse(Long id);
    ReviewResponse addReview(ReviewRequest request);

    UpdateReviewResponse updateReview(Long id, UpdateReviewRequest request);
    DeleteCommentResponse deleteReview(Long id);

    List<ReviewLessonResponse> getReviewByLesson(Long id);
    ReviewLessonResponse addReviewLesson(ReviewLessonRequest request);




}
