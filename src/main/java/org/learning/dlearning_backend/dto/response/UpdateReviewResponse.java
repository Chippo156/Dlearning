package org.learning.dlearning_backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateReviewResponse {
    Long id;
    String content;
}
