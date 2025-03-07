package org.learning.dlearning_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdsActiveResponse {
    Long id;
    String title;
    String image;
    BigDecimal price;
    String description;
    String link;
    LocalDate startDate;
    LocalDate endDate;
}
