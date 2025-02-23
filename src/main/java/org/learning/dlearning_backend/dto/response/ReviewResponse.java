package org.learning.dlearning_backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    Long id;
    String name;
    String avatar;
    String content;
    Integer rating;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    List<ReviewResponse> replies = new ArrayList<>();


}
