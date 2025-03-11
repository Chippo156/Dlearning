package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.CourseLevel;
import org.learning.dlearning_backend.common.TypeCourse;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseResponse {
    Long id;
    String author;
    String title;
    String description;
    Integer duration;
    String language;
    CourseLevel courseLevel;
    TypeCourse typeCourse;
    String thumbnail;
    String videoUrl;
    Double averageRating;
    Long points;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt;
}
