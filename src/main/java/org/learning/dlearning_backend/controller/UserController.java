package org.learning.dlearning_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.service.UserService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/create-user")
    public ResponseData<UserResponse> createUser(@Valid @RequestBody UserCreationRequest request, BindingResult result){
        if(result.hasErrors()){
            log.error("Validation error: {}", result.getAllErrors());
            return ResponseData.<UserResponse>builder()
                    .data(null)
                    .message("Validation error")
                    .code(400)
                    .build();
        }
        var data = userService.createUser(request);
        return ResponseData.<UserResponse>builder()
                .data(data)
                .message("User created successfully")
                .code(200)
                .build();

    }
    @GetMapping("/check-exist-user")
    public ResponseData<UserResponse> checkExistUser(@RequestParam String email){
        if(userService.findByUsername(email) != null){
            return ResponseData.<UserResponse>builder()
                    .data(null)
                    .message("User already exists")
                    .code(400)
                    .build();
        }else{
            return ResponseData.<UserResponse>builder()
                    .data(null)
                    .message("User not found")
                    .code(404)
                    .build();
        }
    }

}
