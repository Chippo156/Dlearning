package org.learning.dlearning_backend.dto.request;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IsCourseCompleteRequest {
    Long courseId;
}
