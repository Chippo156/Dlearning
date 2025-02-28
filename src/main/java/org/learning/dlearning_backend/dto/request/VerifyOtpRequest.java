package org.learning.dlearning_backend.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerifyOtpRequest {
   private String email;
   private String otp;
}
