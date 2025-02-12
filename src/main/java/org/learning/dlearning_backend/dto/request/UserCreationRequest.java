package org.learning.dlearning_backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationRequest {

    @Email
    @NotBlank
    private String email;

    @Size(min = 6, message = "INVALID_PASSWORD")
    private String password;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @DateTimeFormat(pattern = "yyyy/MM/dd")
    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

}
