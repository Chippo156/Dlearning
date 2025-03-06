package org.learning.dlearning_backend.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;


// Handle exception when user is not authenticated
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
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
