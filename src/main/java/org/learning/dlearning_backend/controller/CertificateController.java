package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CertificateCreationEvent;
import org.learning.dlearning_backend.dto.response.CertificateResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.service.CertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/certificate")
public class CertificateController {
    private final CertificateService certificateService;

    @PostMapping("/create-certificate")
    public ResponseData<Void> createCertificate(@RequestBody CertificateCreationEvent event){
        certificateService.createCertificate(event);
        return ResponseData.<Void>builder()
                .code(200)
                .message("Create certificate successfully")
                .build();
    }

    @GetMapping("/current-login")
    public  ResponseData<List<CertificateResponse>> getCertificationByUserLogin() {
        return ResponseData.<List<CertificateResponse>>builder()
                .code(HttpStatus.OK.value())
                .data(certificateService.getCertificateByCurrentLogin())
                .build();
    }
}
