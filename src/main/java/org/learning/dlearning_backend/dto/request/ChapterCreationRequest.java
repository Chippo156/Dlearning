package org.learning.dlearning_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChapterCreationRequest {

    @NotNull(message = "COURSE_ID_INVALID")
    private Long courseId;

    @NotBlank(message = "CHAPTER_NAME_INVALID")
    private String chapterName;

    private String description;

}
