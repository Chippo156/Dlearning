package org.learning.dlearning_backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    USER_NOT_FOUND(400, "User not found", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(400, "Role not found", HttpStatus.NOT_FOUND),
    INVALID_PASSWORD(400, "Invalid password", HttpStatus.BAD_REQUEST),
    ACCOUNT_LOCKED(400, "Account locked", HttpStatus.BAD_REQUEST),
    TOKEN_CREATION_FAILED(400, "Token creation failed", HttpStatus.BAD_REQUEST),
    INVALID_REFRESH_TOKEN(400, "Invalid refresh token", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(401, "Unauthorized", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN(401, "Expired token", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN(401, "Invalid token", HttpStatus.UNAUTHORIZED),
    USER_NOT_EXCITED(401, "User not excited", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(400, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    ;
    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
