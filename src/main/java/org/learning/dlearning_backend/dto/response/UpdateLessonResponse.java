package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateLessonResponse {

    Long courseId;
    Long chapterId;
    String chapterName;
    Long lessonId;
    String lessonName;
    String description;
    String videoUrl;
}
