package org.learning.dlearning_backend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.exception.ExpiredTokenException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CustomJwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(@Nonnull  HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        }catch (ExpiredTokenException exception) {
            ErrorCode errorCode = exception.getErrorCode();
            ResponseData<Object> apiResponse = ResponseData.builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build();
            response.setStatus(errorCode.getHttpStatusCode().value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(new ObjectMapper().writeValueAsString(apiResponse));
        }
    }
}
