package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.learning.dlearning_backend.model.Role;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String email;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;
}
