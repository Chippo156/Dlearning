package org.learning.dlearning_backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandle {
    private static final String MIN_ATTRIBUTE = "min";
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ResponseData<?>> handlingRuntimeException(Exception e){
        log.error(e.getMessage(), e);
        ResponseData<Object> responseData = new ResponseData<>();
        responseData.setCode(400);
        responseData.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(responseData);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ResponseData<?>> handlingAppException(AppException exception){
        log.error(exception.getMessage());
        ErrorCode errorCode = exception.getErrorCode();

        ResponseData<?> apiResponse = new ResponseData<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }
}
