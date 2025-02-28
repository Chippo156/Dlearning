package org.learning.dlearning_backend.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyOtpResponse {
   boolean isValid;
}

