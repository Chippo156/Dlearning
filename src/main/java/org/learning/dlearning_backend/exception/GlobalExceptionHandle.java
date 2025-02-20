package org.learning.dlearning_backend.exception;

import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.util.Map;
import java.util.Objects;

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
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ResponseData<?>> handlingAccessDeniedException(AccessDeniedException exception) {
        log.error(exception.getMessage(), exception);
        ErrorCode errorCode = ErrorCode.ACCESS_DENIED;

        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ResponseData.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ResponseData<?>> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, Object> attributes = null;
        try {
            errorCode = ErrorCode.valueOf(enumKey);

            var constraintViolation = exception.getBindingResult().getAllErrors().get(0).unwrap(ConstraintViolation.class);

            attributes = constraintViolation.getConstraintDescriptor().getAttributes();

            log.info(attributes.toString());

        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(), e);
        }

        ResponseData<Object> apiResponse = new ResponseData<>();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(
                Objects.nonNull(attributes)
                        ? mapAttribute(errorCode.getMessage(), attributes)
                        : errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    ResponseEntity<ResponseData<?>> handlingMethodArgumentTypeMismatchException (MethodArgumentTypeMismatchException exception) {
        log.error(exception.getMessage());

        ResponseData<?> responseData = new ResponseData<>();
        responseData.setCode(404);
        responseData.setMessage("Id invalid, id must be a number");

        return ResponseEntity.status(404).body(responseData);
    }

}
