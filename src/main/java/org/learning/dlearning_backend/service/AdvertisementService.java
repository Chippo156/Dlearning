package org.learning.dlearning_backend.service;


import org.learning.dlearning_backend.dto.request.AdsApproveRequest;
import org.learning.dlearning_backend.dto.request.AdsCreationRequest;
import org.learning.dlearning_backend.dto.response.AdsActiveResponse;
import org.learning.dlearning_backend.dto.response.AdsApproveResponse;
import org.learning.dlearning_backend.dto.response.AdsCreationResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdvertisementService {

    AdsCreationResponse createAds(AdsCreationRequest request, MultipartFile image);
    AdsApproveResponse approveAds(AdsApproveRequest request);

    PageResponse<AdsCreationResponse> getAdsByCurrentLogin(int page, int size);
    List<AdsActiveResponse> getAdsActive();

}
