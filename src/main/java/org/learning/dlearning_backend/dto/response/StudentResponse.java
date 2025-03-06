package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponse {
    private String name;
    private String email;
    private String avatar;
    private String courseName;

    @JsonFormat(pattern = "EEEE, dd MMMM yyyy")
    LocalDateTime createAt;
}
