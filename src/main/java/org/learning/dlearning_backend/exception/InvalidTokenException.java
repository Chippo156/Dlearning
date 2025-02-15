package org.learning.dlearning_backend.exception;

public class InvalidTokenException extends AppException{
public InvalidTokenException() {
        super(ErrorCode.INVALID_TOKEN);
    }
}
