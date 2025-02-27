package org.learning.dlearning_backend.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
public class EmailRequest {
   private String email;
}
