package org.learning.dlearning_backend.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VNPayResponse {
    private String code;
    private String message;
    private String paymentUrl;
}
