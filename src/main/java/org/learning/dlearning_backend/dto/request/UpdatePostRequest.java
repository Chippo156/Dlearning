package org.learning.dlearning_backend.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdatePostRequest {
    @NotBlank(message = "CONTENT_COMMENT_INVALID")
    @Size( max = 500, message = "CONTENT_INVALID")
    String content;
}
