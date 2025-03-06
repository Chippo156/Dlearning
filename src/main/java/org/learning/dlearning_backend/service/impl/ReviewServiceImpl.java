package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.ReviewLessonRequest;
import org.learning.dlearning_backend.dto.request.ReviewRequest;
import org.learning.dlearning_backend.dto.request.UpdateReviewRequest;
import org.learning.dlearning_backend.dto.response.DeleteCommentResponse;
import org.learning.dlearning_backend.dto.response.ReviewLessonResponse;
import org.learning.dlearning_backend.dto.response.ReviewResponse;
import org.learning.dlearning_backend.dto.response.UpdateReviewResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.ReviewMapper;
import org.learning.dlearning_backend.model.*;
import org.learning.dlearning_backend.repository.*;
import org.learning.dlearning_backend.service.BannedWordService;
import org.learning.dlearning_backend.service.ReviewService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewServiceImpl implements ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final BannedWordService bannedWordService;


    @Override
    public List<ReviewResponse> getReviewByCourse(Long id) {
        List<Review> allReviews = reviewRepository.findByCourseIdAndAndChapterIsNullAndLessonIsNull(id);
        return allReviews.stream().map(reviewMapper::toCommentResponse).toList();
    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public ReviewResponse addReview(ReviewRequest request) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        Review parentReview = null;
        if (request.getParentReviewId() != null) {
            parentReview = reviewRepository.findById(request.getParentReviewId())
                    .orElseThrow(() -> new AppException(ErrorCode.PARENT_COMMENT_NOT_EXISTED));
        }
        if (request.getContent() == null || request.getContent().isEmpty() || request.getRating() == null) {
            throw new AppException(ErrorCode.INVALID_COMMENT_OR_RATING);
        }
        if (request.getRating() < 0 || request.getRating() > 5) {
            throw new AppException(ErrorCode.INVALID_RATING);
        }
        if (bannedWordService.containsBannedWord(request.getContent())) {
            throw new AppException(ErrorCode.BANNED_WORD_EXISTED);
        }

        Review newComment = Review.builder()
                .user(user)
                .content(request.getContent() != null && !request.getContent().isEmpty() ? request.getContent() : "")
                .rating(request.getRating())
                .course(course)
                .parentReview(parentReview)
                .build();
        reviewRepository.save(newComment);
        return reviewMapper.toCommentResponse(newComment);
    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('TEACHER', 'ADMIN')")
    public UpdateReviewResponse updateReview(Long id, UpdateReviewRequest request) {
        var email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PARENT_COMMENT_NOT_EXISTED));
        if (Objects.equals(user.getId(), review.getUser().getId())) {
            if (request.getContent() != null && !request.getContent().isEmpty()) {
                review.setContent(request.getContent());
            }
            if(bannedWordService.containsBannedWord(request.getContent())){
                throw new AppException(ErrorCode.BANNED_WORD_EXISTED);
            }
            if (request.getRating() != null) {
                review.setRating(request.getRating());
            }
            reviewRepository.save(review);
        }
        return UpdateReviewResponse.builder()
                .id(review.getId())
                .content(review.getContent())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('TEACHER', 'ADMIN')")
    public DeleteCommentResponse deleteReview(Long id) {
        var email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PARENT_COMMENT_NOT_EXISTED));

        if (Objects.equals(user.getId(), review.getUser().getId())) {
            reviewRepository.deleteById(id);

            return DeleteCommentResponse.builder()
                    .id(id)
                    .message("Delete comment successfully")
                    .build();
        }
        throw new AppException(ErrorCode.DELETE_COMMENT_INVALID);
    }

    @Override
    public List<ReviewLessonResponse> getReviewByLesson(Long id) {
        return reviewRepository.findByLessonId(id).stream().map(reviewMapper::toResponseLesson).toList();
    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public ReviewLessonResponse addReviewLesson(ReviewLessonRequest request) {

        var email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        var course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        var chapter = chapterRepository.findById(request.getChapterId())
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_EXISTED));
        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_EXISTED));

        Review parentReview = null;
        if (request.getParentReviewId() != null) {
            parentReview = reviewRepository.findById(request.getParentReviewId())
                    .orElseThrow(() -> new AppException(ErrorCode.PARENT_COMMENT_NOT_EXISTED));
        }
        if ((request.getContent() == null || request.getContent().isEmpty())) {
            throw new AppException(ErrorCode.INVALID_COMMENT_CONTENT);
        }

        Review review = Review.builder()
                .user(user)
                .course(course)
                .content(request.getContent())
                .lesson(lesson)
                .chapter(chapter)
                .parentReview(parentReview)
                .build();

        reviewRepository.save(review);
        return reviewMapper.toResponseLesson(review);
    }


}
