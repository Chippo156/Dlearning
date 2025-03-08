package org.learning.dlearning_backend.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PaymentType;
import org.learning.dlearning_backend.dto.response.VNPayResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.PaymentInfo;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.PaymentService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.learning.dlearning_backend.utils.ServletHelper;
import org.learning.dlearning_backend.utils.VNPayUtil;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final UserRepository userRepository;
    private final VNPayUtil vnPayUtil;
    @Override
    public VNPayResponse createPayment(HttpServletRequest request) {
        BigDecimal amount = new BigDecimal(request.getParameter("amount")).multiply(BigDecimal.valueOf(100));
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode
                .EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode
                .USER_NOT_EXCITED));
        PaymentInfo paymentInfo = new PaymentInfo()
                .setReference(PaymentType.DEPOSIT + "_" + user.getId() + "_" + VNPayUtil.getRandomNumber(6))
                .setAmount(amount)
                .setDescription("Thanh toan")
                .setExpiresIn(Duration.ofMinutes(15))
                .setIpAddress(ServletHelper.extractIPAddress(request));
        String paymentUrl = vnPayUtil.getPaymentURL(paymentInfo);
        return VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl)
                .build();
    }
}
