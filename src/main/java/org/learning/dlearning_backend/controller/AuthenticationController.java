package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.IntrospectRequest;
import org.learning.dlearning_backend.dto.request.SignInRequest;
import org.learning.dlearning_backend.dto.response.IntrospectResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.SignInResponse;
import org.learning.dlearning_backend.service.impl.AuthenticationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    ResponseData<SignInResponse> signIn(@RequestBody SignInRequest request) {
        log.info("User {} is signing in", request.getEmail());
        var response = authenticationService.signIn(request);
        return ResponseData.<SignInResponse>builder()
                .data(response)
                .code(200)
                .message("Sign in success")
                .build();
    }
    @PostMapping("/introspect")
    ResponseData<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        log.info("Introspect token");
        var response = authenticationService.introspect(request);
        return ResponseData.<IntrospectResponse>builder()
                .data(response)
                .code(200)
                .message("Sign in success")
                .build();
    }
}
