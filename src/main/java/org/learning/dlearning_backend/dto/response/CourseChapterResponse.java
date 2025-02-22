package org.learning.dlearning_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseChapterResponse {
    Long courseId;
    Long totalLesson;
    String courseTitle;
    String courseDescription;

    @Builder.Default
    Set<ChapterDto> chapters = Collections.emptySet();


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ChapterDto{
        Long chapterId;
        String chapterName;

        @Builder.Default
        Set<LessonDto> lessonDto = Collections.emptySet();
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class LessonDto{
        Long lessonId;
        String lessonName;
        String description;
        String videoUrl;
    }

}
