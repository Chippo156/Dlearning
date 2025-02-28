package org.learning.dlearning_backend.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordResponse {
    private boolean success;
    private String message;
}
