package org.learning.dlearning_backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    @Size(max = 500, message = "CONTENT_INVALID")
    private String content;
    private Long postId;
    private Long parentCommentId;
}
