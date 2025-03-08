package org.learning.dlearning_backend.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdsCreationRequest {
    @NotBlank(message = "TITLE_ADS_INVALID")
    private String title;
    private String description;
    private String image;
    private String location;
    private String link;
    private Long courseId;

    @NotBlank(message = "EMAIL_CONTACT_INVALID")
    private String contactEmail;

    @NotBlank(message = "PHONE_CONTACT_INVALID")
    private String contactPhone;

    @Future(message = "START_DATE_INVALID")
    private LocalDate startDate;
    @FutureOrPresent(message = "START_END_INVALID")
    private LocalDate endDate;
}
