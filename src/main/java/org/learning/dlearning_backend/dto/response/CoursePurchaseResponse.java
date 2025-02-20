package org.learning.dlearning_backend.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CoursePurchaseResponse {
    Long courseId;
    Long userId;
    boolean purchased;
}
