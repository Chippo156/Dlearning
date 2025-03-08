package org.learning.dlearning_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.AdsStatus;
import org.learning.dlearning_backend.common.PaymentMethodName;
import org.learning.dlearning_backend.common.PaymentStatus;
import org.learning.dlearning_backend.common.PaymentType;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.VNPayResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.Advertisement;
import org.learning.dlearning_backend.model.Payment;
import org.learning.dlearning_backend.model.PaymentMethod;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.AdvertisementRepository;
import org.learning.dlearning_backend.repository.PaymentMethodRepository;
import org.learning.dlearning_backend.repository.PaymentRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.AdvertisementService;
import org.learning.dlearning_backend.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final AdvertisementRepository advertisementRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    @GetMapping("/vn-pay")
    public ResponseData<VNPayResponse> pay(HttpServletRequest request){
        return ResponseData.<VNPayResponse>builder()
                .code(200)
                .message("OK")
                .data(paymentService.createPayment(request))
                .build();
    }
    @GetMapping("/vn-pay-callback")
    public void handleVnPayCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String redirectUrl;
        String transactionStatus = request.getParameter("vnp_ResponseCode");

        BigDecimal amountInVNPay = new BigDecimal(request.getParameter("vnp_Amount"));
        BigDecimal actualAmount = amountInVNPay.divide(new BigDecimal(100));

        if("00".equals(transactionStatus)){
            String paymentRef = request.getParameter("vnp_TxnRef");
            String [] ref = paymentRef.split("_");
            String paymentType = ref[0];

            switch (paymentType){
                case PaymentType.DEPOSIT: {
                    User user = userRepository.findById(Long.parseLong(ref[1]))
                            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

                    recordPaymentTransaction(user, actualAmount, PaymentStatus.SUCCESS);
                    BigDecimal pointPer1000VND = new BigDecimal(10); // 10 points for 1000 VND
                    BigDecimal numberOfThousands = actualAmount.divide(new BigDecimal(1000));
                    BigDecimal totalPoints = numberOfThousands.multiply(pointPer1000VND);

                    long pointsToAdd = totalPoints.longValue();
                    if(user.getPoints() == null){
                        user.setPoints(pointsToAdd);
                    }else{
                        user.setPoints(user.getPoints() + pointsToAdd);
                    }
                    userRepository.save(user);
                    break;
                }
                case PaymentType.ADVERTISEMENT:{
                    Advertisement advertisement = advertisementRepository.findById(Long.parseLong(ref[1]))
                            .orElseThrow(() -> new AppException(ErrorCode.ADS_NOT_EXISTED));
                    if(actualAmount.compareTo(advertisement.getPrice()) >= 0){
                        advertisement.setAdsStatus(AdsStatus.ACTIVE);
                    }
                    advertisementRepository.save(advertisement);
                    break;
                }
                default:{
                    throw new AppException(ErrorCode.PAYMENT_TYPE_INVALID);
                }
            }
            redirectUrl = "http://localhost:5173/payment-success";
        }
        else if("24".equals(transactionStatus)) {
            redirectUrl = "http://localhost:5173/payment-cancel";
        }else {
            redirectUrl = "http://localhost:5173/payment-failed";
        }
        response.sendRedirect(redirectUrl);
    }

    private void recordPaymentTransaction(User user, BigDecimal amount, PaymentStatus status){
        PaymentMethod paymentMethod = paymentMethodRepository.findByMethodName(PaymentMethodName.BANK_TRANSFER)
                .orElseGet(() -> paymentMethodRepository.save(
                        PaymentMethod.builder()
                                .methodName(PaymentMethodName.BANK_TRANSFER)
                                .build())
                );
        Payment payment = Payment.builder()
                .user(user)
                .price(amount)
                .paymentStatus(status)
                .paymentMethod(paymentMethod)
                .build();
        paymentRepository.save(payment);
    }
}
