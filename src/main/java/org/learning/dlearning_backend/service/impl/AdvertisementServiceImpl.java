package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.AdsStatus;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.event.NotificationEvent;
import org.learning.dlearning_backend.dto.request.AdsApproveRequest;
import org.learning.dlearning_backend.dto.request.AdsCreationRequest;
import org.learning.dlearning_backend.dto.response.AdsActiveResponse;
import org.learning.dlearning_backend.dto.response.AdsApproveResponse;
import org.learning.dlearning_backend.dto.response.AdsCreationResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.AdsMapper;
import org.learning.dlearning_backend.model.Advertisement;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.PaymentInfo;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.AdvertisementRepository;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.AdvertisementService;
import org.learning.dlearning_backend.service.NotificationService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.learning.dlearning_backend.utils.VNPayUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementRepository advertisementRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final AdsMapper adsMapper;
    private final NotificationService notificationService;
    private final CourseRepository courseRepository;
    private final VNPayUtil vnPayUtil;

    @Override
    @PreAuthorize(" isAuthenticated()")
    public AdsCreationResponse createAds(AdsCreationRequest request, MultipartFile image) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        String imageUrl = cloudinaryService.uploadImage(image);
        request.setImage(imageUrl);
        Advertisement advertisement = adsMapper.toAdvertisementEntity(request);
        advertisement.setImage(request.getImage());
        advertisement.setUser(user);
        advertisement.setCourse(course);
        advertisementRepository.save(advertisement);

        String message = "A teacher has create advertisement";
        String title =  "New advertisement created";
        String url = "/admin/ads";

        List<User> userAdmin = userRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
        for (User usersAdmin : userAdmin) {
            notificationService.createNotification(usersAdmin,user,  message, title, url);
        }
        return adsMapper.toAdsCreationResponse(advertisement);
    }

    @Override
    public AdsApproveResponse approveAds(AdsApproveRequest request) {

        Advertisement advertisement = advertisementRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.ADS_NOT_EXISTED));

        advertisement.setAdsStatus(AdsStatus.AWAITING_PAYMENT);
        advertisementRepository.save(advertisement);

        PaymentInfo paymentInfo = new PaymentInfo()
                .setReference("ADS_" + advertisement.getId())
                .setAmount(advertisement.getPrice().multiply(BigDecimal.valueOf(100)))
                .setDescription("Chay quang cao")
                .setExpiresIn(Duration.ofDays(1))
                .setIpAddress("0:0:0:0:0:0:0:1");


        String qrCodeUrl = "https://lh6.googleusercontent.com/proxy/BekiCiO_nYW9g-JB-72dP3FnxBDXFvi7rT7gYP7cTiVKXggT_88-QscAL6sK_2mBjTTpWzMc2lCaPjs7qCHU94QvXov45qQiNmyrW8MGAzc38PBmzElAFgLjMscpMbMwrC0mKXVcQrguzyFe4VClo6SVHudUQkxFjk5qk_vBR67K8DI3Gp5wcDDbvULai7Soq8GvcJA620h1bZ5lj-02WsRWHumb94_wPDko0mjeZw7KYrDKebkrst6XUPRbQDvEaZMIZfF572y2Y30iVD9HzbmOpX_fK605or7WKhFKaEmirqPMxaAHiUuYXIUoQ-z2CJ9pqzO7gVg-nYL-Ka-yL3SB3Mj1641byJnmr8tRuAuQUkF0pKHmbfAytWbamyE";
        Map<String, Object> emailData = new HashMap<>();
        emailData.put("title", advertisement.getTitle());
        emailData.put("description", advertisement.getDescription());
        emailData.put("img", advertisement.getImage());
        emailData.put("link", advertisement.getLink());
        emailData.put("startDate", advertisement.getStartDate().toString());
        emailData.put("endDate", advertisement.getEndDate().toString());
        emailData.put("priceAds", advertisement.getPrice() + " VND");
        emailData.put("qrCodeUrl", qrCodeUrl);
        emailData.put("status", advertisement.getAdsStatus().name());
        emailData.put("paymentUrl", vnPayUtil.getPaymentURL(paymentInfo));

        NotificationEvent notificationEvent = NotificationEvent.builder()
                .channel("Ads")
                .recipient(advertisement.getContactEmail())
                .templateCode("APPROVE_ADS")
                .subject("Congratulations! Your ads has been approved")
                .param(emailData)
                .build();
        kafkaTemplate.send("notification-delivery", notificationEvent);
        return adsMapper.toAdsApproveResponse(advertisement);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public PageResponse<AdsCreationResponse> getAdsByCurrentLogin(int page, int size) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        Page<Advertisement> advertisements = advertisementRepository.findAdvertisementByUserId(user.getId(), PageRequest.of(page-1, size));

        return PageResponse.<AdsCreationResponse>builder()
                .result(advertisements.stream().map(adsMapper::toAdsCreationResponse).toList())
                .totalPages(advertisements.getTotalPages())
                .totalElements(advertisements.getTotalElements())
                .currentPage(page)
                .pageSize(size)
                .build();
    }

    @Override
    public List<AdsActiveResponse> getAdsActive() {
        return advertisementRepository.findAdvertisementByApprovalStatusActive(AdsStatus.ACTIVE)
                .stream()
                .map(adsMapper::toAdsActiveResponse)
                .toList();
    }
}
