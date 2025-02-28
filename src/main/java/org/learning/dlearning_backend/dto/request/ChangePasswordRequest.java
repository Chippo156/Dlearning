package org.learning.dlearning_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {

    @Size(min = 6, message = "INVALID_PASSWORD")
    String currentPassword;
    @Size(min = 6, message = "INVALID_PASSWORD")
    String newPassword;
    @NotBlank(message = "Confirm password is required")
    String confirmPassword;
}
