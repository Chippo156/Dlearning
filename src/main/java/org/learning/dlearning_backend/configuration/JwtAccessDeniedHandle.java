package org.learning.dlearning_backend.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;


//Handle when user access denied
public class JwtAccessDeniedHandle implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

            ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;
            response.setStatus(errorCode.getCode());
            response.setContentType("application/json");

            ResponseData<Object> apiResponse = ResponseData.builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build();
            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
            response.flushBuffer();


    }
}
