package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.common.AdsStatus;
import org.learning.dlearning_backend.dto.request.AdsCreationRequest;
import org.learning.dlearning_backend.dto.response.AdsActiveResponse;
import org.learning.dlearning_backend.dto.response.AdsApproveResponse;
import org.learning.dlearning_backend.dto.response.AdsCreationResponse;
import org.learning.dlearning_backend.model.Advertisement;
import org.learning.dlearning_backend.repository.AdvertisementRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public  class AdsMapper {

    AdvertisementRepository advertisementRepository;
    UserRepository userRepository;


    public AdsMapper(AdvertisementRepository advertisementRepository, UserRepository userRepository) {
        this.advertisementRepository = advertisementRepository;
        this.userRepository = userRepository;
    }
    public Advertisement toAdvertisementEntity(AdsCreationRequest request) {

        return Advertisement.builder()
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .title(request.getTitle())
                .image(request.getImage())
                .link(request.getLink())
                .description(request.getDescription())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .price(totalOfMoneyAds(request.getStartDate(), request.getEndDate()))
                .adsStatus(AdsStatus.PENDING)
                .build();
    }
    public AdsCreationResponse toAdsCreationResponse(Advertisement advertisement) {
        return AdsCreationResponse.builder()
                .id(advertisement.getId())
                .contactEmail(advertisement.getContactEmail())
                .contactPhone(advertisement.getContactPhone())
                .title(advertisement.getTitle())
                .description(advertisement.getDescription())
                .startDate(advertisement.getStartDate())
                .endDate(advertisement.getEndDate())
                .priceAds(totalOfMoneyAds(advertisement.getStartDate(), advertisement.getEndDate()))
                .location(advertisement.getLocation())
                .image(advertisement.getImage())
                .link(advertisement.getLink())
                .adsStatus(advertisement.getAdsStatus())
                .createAt(advertisement.getCreatedAt())
                .build();
    }
    public AdsApproveResponse toAdsApproveResponse(Advertisement advertisement) {
        return AdsApproveResponse.builder()
                .id(advertisement.getId())
                .contactEmail(advertisement.getContactEmail())
                .contactPhone(advertisement.getContactPhone())
                .title(advertisement.getTitle())
                .description(advertisement.getDescription())
                .link(advertisement.getLink())
                .image(advertisement.getImage())
                .startDate(advertisement.getStartDate())
                .endDate(advertisement.getEndDate())
                .priceAds(totalOfMoneyAds(advertisement.getStartDate(), advertisement.getEndDate()))
                .adsStatus(advertisement.getAdsStatus())
                .build();
    }
    public AdsActiveResponse toAdsActiveResponse (Advertisement advertisement){

        return AdsActiveResponse.builder()
                .id(advertisement.getId())
                .title(advertisement.getTitle())
                .image(advertisement.getImage())
                .price(advertisement.getPrice())
                .description(advertisement.getDescription())
                .link(advertisement.getLink())
                .startDate(advertisement.getStartDate())
                .endDate(advertisement.getEndDate())
                .build();
    }

    private BigDecimal totalOfMoneyAds(LocalDate startDate, LocalDate endDate) {
        long days = ChronoUnit.DAYS.between(startDate, endDate);
        BigDecimal dailyRate = BigDecimal.valueOf(100000);
        return dailyRate.multiply(BigDecimal.valueOf(days));
    }

}
