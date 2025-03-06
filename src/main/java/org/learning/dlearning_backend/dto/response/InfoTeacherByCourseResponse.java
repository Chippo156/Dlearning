package org.learning.dlearning_backend.dto.response;


import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InfoTeacherByCourseResponse {
    private Long userId;
    private String name;
    private String avatar;
    private BigDecimal avgRating;
    private Integer reviewAmount;
    private Integer studentAmount;
    private Integer courseAmount;
    private String description;
}
