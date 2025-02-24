package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.CourseLevel;
import org.learning.dlearning_backend.common.Gender;

import java.time.LocalDate;
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileResponse {
    String avatar;
    String firstName;
    String lastName;
    Gender gender;
    String phoneNumber;
    LocalDate dateOfBirth;
    String address;
    String description;
    CourseLevel courseLevel;
}
