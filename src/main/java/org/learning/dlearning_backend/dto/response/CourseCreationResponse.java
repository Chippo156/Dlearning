package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.CourseLevel;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseCreationResponse {
    Long id;
    String author;
    String title;
    String description;
    Integer duration;
    String language;
    CourseLevel courseLevel;
    String thumbnail;
    String videoUrl;
    Long points;
}
