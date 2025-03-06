package org.learning.dlearning_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.RegistrationStatus;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRegisterTeacherRequest {
    String email;
    String name;
    String phone;
    String expertise;
    Double yearsOfExperience;
    String bio;
    String facebookLink;
    String certificate;
    String cvUrl;
}
