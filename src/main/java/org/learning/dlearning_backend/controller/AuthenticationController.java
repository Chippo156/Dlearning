package org.learning.dlearning_backend.controller;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.IntrospectRequest;
import org.learning.dlearning_backend.dto.request.LogoutRequest;
import org.learning.dlearning_backend.dto.request.RefreshTokenRequest;
import org.learning.dlearning_backend.dto.request.SignInRequest;
import org.learning.dlearning_backend.dto.response.IntrospectResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.AuthenticationResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.service.impl.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    ResponseData<AuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        log.info("User {} is signing in", request.getEmail());
        var response = authenticationService.signIn(request);
        return ResponseData.<AuthenticationResponse>builder()
                .data(response)
                .code(200)
                .message("Sign in success")
                .build();
    }
    @PostMapping("/introspect")
    ResponseData<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {

            log.info("Introspect token");
            var response = authenticationService.introspect(request);
            return ResponseData.<IntrospectResponse>builder()
                    .data(response)
                    .code(HttpStatus.OK.value())
                    .build();


    }
    @PostMapping("/refresh")
    ResponseData<AuthenticationResponse> refresh(@RequestBody RefreshTokenRequest request) throws ParseException, JOSEException {
        log.info("Refresh token");
        var response = authenticationService.generateRefreshToken(request);
        return ResponseData.<AuthenticationResponse>builder()
                .data(response)
                .code(200)
                .message("Refresh token success")
                .build();
    }
    @PostMapping("/logout")
    ResponseData<Void> logout(@RequestBody LogoutRequest request) {
        log.info("Logout token");
        authenticationService.logout(request);
        return ResponseData.<Void>builder()
                .code(200)
                .message("Logout success")
                .build();
    }
    @GetMapping("/demo")
    public ResponseData<?> appError() {
        throw new AppException(ErrorCode.EXPIRED_TOKEN);
    }
}
