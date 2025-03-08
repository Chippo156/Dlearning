package org.learning.dlearning_backend.service;

import jakarta.servlet.http.HttpServletRequest;
import org.learning.dlearning_backend.dto.response.VNPayResponse;

public interface PaymentService {

    VNPayResponse createPayment(HttpServletRequest request);

}
