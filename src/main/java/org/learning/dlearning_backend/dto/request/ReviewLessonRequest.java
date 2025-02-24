package org.learning.dlearning_backend.dto.request;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewLessonRequest {
    Long reviewId;
    Long courseId;
    Long chapterId;
    Long lessonId;
    String content;
    Long parentReviewId;

}
