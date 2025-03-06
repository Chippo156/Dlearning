package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.UserRegisterTeacherRequest;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UserRegisterTeacherResponse;
import org.learning.dlearning_backend.service.RegisterTeacherService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/register-teacher")
public class RegisterTeacherController {
    private final RegisterTeacherService registerTeacherService;

    @PostMapping(consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseData<UserRegisterTeacherResponse> registerTeacher(@RequestPart("request") UserRegisterTeacherRequest request,
                                                                     @RequestPart("cv") MultipartFile cv,
                                                                     @RequestPart("certificate") MultipartFile certificate) throws IOException, URISyntaxException {
        var response = registerTeacherService.registerTeacher(request, cv, certificate);
        return ResponseData.<UserRegisterTeacherResponse>builder()
                .data(response)
                .code(200)
                .message("Register teacher successfully")
                .build();
    }

    @GetMapping("/get-all-register-teacher")
    public ResponseData<List<UserRegisterTeacherResponse>> getAllRegisterTeacher() {
        var response = registerTeacherService.getAllRegisterTeacher();
        return ResponseData.<List<UserRegisterTeacherResponse>>builder()
                .data(response)
                .code(200)
                .message("Get all register teacher successfully")
                .build();
    }

    @PostMapping("/approve-register-teacher/{id}")
    public ResponseData<UserRegisterTeacherResponse> approveRegisterTeacher(@PathVariable Long id) {
        var response = registerTeacherService.saveTeacher(id);
        return ResponseData.<UserRegisterTeacherResponse>builder()
                .data(response)
                .code(200)
                .message("Approve register teacher successfully")
                .build();
    }

    @PostMapping("/reject-register-teacher/{id}")
    public ResponseData<UserRegisterTeacherResponse> rejectRegisterTeacher(@PathVariable Long id) {
        var response = registerTeacherService.rejectTeacher(id);
        return ResponseData.<UserRegisterTeacherResponse>builder()
                .data(response)
                .code(200)
                .message("Reject register teacher successfully")
                .build();
    }
}
