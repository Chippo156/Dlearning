package org.learning.dlearning_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCompletionResponse {
    Long totalLessonComplete;
    Long totalLessons;
    BigDecimal completionPercentage;

    @Builder.Default
    List<LessonComplete> lessonCompletes = Collections.emptyList();

    @Setter
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class LessonComplete {
        Long lessonId;
        String lessonName;
    }
}
