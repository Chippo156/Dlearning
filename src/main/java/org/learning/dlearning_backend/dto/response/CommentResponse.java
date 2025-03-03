package org.learning.dlearning_backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {

    private Long id;
    private String content;
    private Long postId;
    private String name;
    private String avatar;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    @Builder.Default
    List<CommentResponse> replies = new ArrayList<>();

}
