package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.UserProfileRequest;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserProfileResponse;
import org.learning.dlearning_backend.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/profile")
public class ProfileController {
    private final ProfileService profileService;


    @Operation(summary = "Get info user", description = "Get info user")
    @ApiResponse(responseCode = "200", description = "Get info user successfully",
            content = @Content(schema = @Schema(implementation = UserProfileResponse.class))
    )
    @GetMapping("/get-info")
    public ResponseData<UserProfileResponse> getInfo(){
        return ResponseData.<UserProfileResponse>builder()
                .data(profileService.getInfoUser())
                .message("Get info user successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Update profile", description = "Update profile")
    @ApiResponse(responseCode = "200", description = "Update profile successfully",
            content = @Content(schema = @Schema(implementation = String.class))
    )
    @PutMapping("/update-profile")
    public ResponseData<String> updateProfile(@RequestBody UserProfileRequest request){
        profileService.updateProfile(request);
        return ResponseData.<String>builder()
                .data("Update profile successfully")
                .message("Update profile successfully")
                .code(200)
                .build();
    }
}
