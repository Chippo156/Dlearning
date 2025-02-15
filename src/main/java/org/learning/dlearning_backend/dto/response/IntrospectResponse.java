package org.learning.dlearning_backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IntrospectResponse {
    boolean valid;
    String scope;
}
