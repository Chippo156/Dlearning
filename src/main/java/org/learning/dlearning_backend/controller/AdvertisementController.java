package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.AdsApproveRequest;
import org.learning.dlearning_backend.dto.request.AdsCreationRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.service.AdvertisementService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/advertisement")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @PostMapping("/create-ads")
    public ResponseData<AdsCreationResponse> createAds(
            @RequestPart("request") AdsCreationRequest request, @RequestPart("image") MultipartFile image) {
        var result = advertisementService.createAds(request, image);
        return ResponseData.<AdsCreationResponse>builder()
                .data(result)
                .code(200)
                .message("Create Ads Successfully")
                .build();
    }

    @PostMapping("/approve-ads")
    public ResponseData<AdsApproveResponse> approveAds(@RequestBody AdsApproveRequest request) {
        var result = advertisementService.approveAds(request);
        return ResponseData.<AdsApproveResponse>builder()
                .data(result)
                .code(200)
                .message("Approve Ads Successfully")
                .build();
    }

    @GetMapping("/get-ads")
    public ResponseData<PageResponse<AdsCreationResponse>> getAdsByCurrentLogin(@RequestParam(name = "page", required = false, defaultValue = "1") int page
            , @RequestParam(name = "size", required = false, defaultValue = "5") int size) {
        var result = advertisementService.getAdsByCurrentLogin(page, size);
        return ResponseData.<PageResponse<AdsCreationResponse>>builder()
                .data(result)
                .code(200)
                .message("Get Ads Successfully")
                .build();
    }

    @GetMapping("/get-ads-active")
    public ResponseData<List<AdsActiveResponse>> getAdsActive() {
        var result = advertisementService.getAdsActive();
        return ResponseData.<List<AdsActiveResponse>>builder()
                .data(result)
                .code(200)
                .message("Get Ads Active Successfully")
                .build();
    }
}
