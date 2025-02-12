package org.learning.dlearning_backend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Builder
public class ResponseData<T> {
    private String message;
    private int code;
    private T data;

}
