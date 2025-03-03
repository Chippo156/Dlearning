package org.learning.dlearning_backend.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCreationRequest {

    @NotBlank(message = "CONTENT_POST_INVALID")
    private String content;

    private String image;
}
