package org.learning.dlearning_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.RegistrationStatus;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRegisterTeacherResponse {
    String email;
    String name;
    String phone;
    String expertise;
    Double yearsOfExperience;
    String bio;
    String facebookLink;
    String certificate;
    String cvUrl;
    RegistrationStatus registrationStatus;
}
