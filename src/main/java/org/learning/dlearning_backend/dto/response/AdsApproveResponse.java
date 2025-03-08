package org.learning.dlearning_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.learning.dlearning_backend.common.AdsStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdsApproveResponse {
    private Long id;
    private Long courseId;
    private String title;
    private String description;
    private String image;
    private String location;
    private String link;
    private String contactEmail;
    private String contactPhone;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;
    private BigDecimal priceAds;
    private AdsStatus adsStatus;

}
