package org.learning.dlearning_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.response.PointsCurrentResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.UserService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @GetMapping("/my-info")
    public ResponseData<UserResponse> getMyInfo(){
        var data = userService.myProfile();
        return ResponseData.<UserResponse>builder()
                .data(data)
                .message("Get user info successfully")
                .code(200)
                .build();
    }
    @PutMapping("/upload-avatar")
    public ResponseData<UserResponse> uploadAvatar(@RequestPart("avatar") MultipartFile file ){
        userService.uploadAvatar(file);
        return ResponseData.<UserResponse>builder()
                .data(null)
                .message("Upload avatar successfully")
                .code(200)
                .build();
    }
    @GetMapping("/get-avatar")
    public ResponseData<String> getAvatar(){
        var data = userService.getAvatar();
        return ResponseData.<String>builder()
                .data(data)
                .message("Get avatar successfully")
                .code(200)
                .build();
    }
    @GetMapping("/get-points-current")
    public ResponseData<PointsCurrentResponse> getPointsCurrent(){
        var data = userService.getPointsCurrent();
        return ResponseData.<PointsCurrentResponse>builder()
                .data(data)
                .message("Get points current successfully")
                .code(200)
                .build();
    }

    @GetMapping("/test")
    public User test(){
        return userService.getUser();
    }



}
