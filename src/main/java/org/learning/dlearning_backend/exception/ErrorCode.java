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
    EXPIRED_TOKEN(401, "EXPIRED_TOKEN", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN(401, "Invalid token", HttpStatus.UNAUTHORIZED),
    USER_NOT_EXCITED(401, "User not excited", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(400, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    EMAIL_INVALID(400, "Email invalid", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(403, "Only teachers and Admins have the right to create or delete courses.", HttpStatus.FORBIDDEN),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    COURSE_NOT_EXISTED(400, "Course not existed", HttpStatus.NOT_FOUND),
    INVALID_PATH_VARIABLE_ID (400, "Id must be a number greater than zero ", HttpStatus.BAD_REQUEST),
    COURSE_ALREADY_PURCHASED(400, "You already own this course", HttpStatus.BAD_REQUEST),
    NOT_ENOUGH_POINTS(400, "Current points is not enough", HttpStatus.BAD_REQUEST),;
    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
