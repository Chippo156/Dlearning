package org.learning.dlearning_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.CourseLevel;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BuyCourseResponse {
    Long courseId;
    String title;
    String author;
    CourseLevel courseLevel;
    String thumbnail;
    Long points;
    LocalDateTime createdAt;
}
