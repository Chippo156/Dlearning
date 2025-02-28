package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.EmailRequest;
import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.request.VerifyOtpRequest;
import org.learning.dlearning_backend.dto.response.PointsCurrentResponse;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.dto.response.VerifyOtpResponse;
import org.learning.dlearning_backend.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface UserService {


    UserResponse createUser(UserCreationRequest request,String otp);
    UserResponse findByUsername(String username);
    UserResponse myProfile();
    void uploadAvatar(MultipartFile file);
    String getAvatar();
    PointsCurrentResponse getPointsCurrent();
    User getUser();
    void sendOtpRegister(EmailRequest request);
    void sendOtpForgotPassword(EmailRequest request);
    VerifyOtpResponse verifyOtp(VerifyOtpRequest request);




}
