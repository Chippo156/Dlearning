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
    NOT_ENOUGH_POINTS(400, "Current points is not enough", HttpStatus.BAD_REQUEST),
    CHAPTER_NOT_EXISTED(400, "Chapter not existed", HttpStatus.NOT_FOUND),
    LESSON_NOT_EXISTED(400, "Lesson not existed", HttpStatus.NOT_FOUND),
    FORBIDDEN(403, "Insufficient rights", HttpStatus.FORBIDDEN),
    UPLOAD_LESSON_INVALID(400, "An error occurred while uploading the lesson, please try again.", HttpStatus.BAD_REQUEST),
    COURSE_ACCESS_DENIED(400, "You do not have permission to view the progress of this course.", HttpStatus.BAD_REQUEST),
    PARENT_COMMENT_NOT_EXISTED(400, "ParentComment not existed", HttpStatus.BAD_REQUEST),
    INVALID_COMMENT_OR_RATING(400, "Please provide at least a comment or a rating.", HttpStatus.BAD_REQUEST),
    INVALID_RATING(400, "Only rating greater than or equal to 0 and less than 5", HttpStatus.BAD_REQUEST),
    INVALID_COMMENT_CONTENT(400, "Comment content is invalid", HttpStatus.BAD_REQUEST),
    DELETE_COMMENT_INVALID(403, "You can only delete your own comments.", HttpStatus.FORBIDDEN),
    INVALID_OTP(400, "OTP is invalid or expired", HttpStatus.BAD_REQUEST),
    CURRENT_PASSWORD_INVALID(400, "Current password is invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_EXISTED(400, "Password existed", HttpStatus.BAD_REQUEST),
    CONFIRM_PASSWORD_INVALID(400, "Confirm password is invalid", HttpStatus.BAD_REQUEST),
    POST_NOT_EXISTED(400, "Post not existed", HttpStatus.NOT_FOUND),
    COMMENT_NOT_EXISTED(400, "Comment not existed", HttpStatus.NOT_FOUND),
    CONTENT_COMMENT_INVALID(400, "Content Comment cannot be null", HttpStatus.BAD_REQUEST),
    UPDATE_COMMENT_INVALID(403, "You can only update your own comments.", HttpStatus.FORBIDDEN),
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
