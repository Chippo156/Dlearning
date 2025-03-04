package org.learning.dlearning_backend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.event.NotificationEvent;
import org.learning.dlearning_backend.dto.request.EmailRequest;
import org.learning.dlearning_backend.dto.request.ResetPasswordRequest;
import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.request.VerifyOtpRequest;
import org.learning.dlearning_backend.dto.response.ChangePasswordResponse;
import org.learning.dlearning_backend.dto.response.PointsCurrentResponse;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.dto.response.VerifyOtpResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.UserMapper;
import org.learning.dlearning_backend.model.Role;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.RoleRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.UserService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;


@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    CloudinaryService cloudinaryService;
    OtpServiceImpl otpService;
    EmailService emailService;
    KafkaTemplate<String,Object> kafkaTemplate;
    static Random random = new Random();  // Compliant

    private static final String EMAIL = "EMAIL";  // Compliant

    @Override
    public UserResponse createUser(UserCreationRequest request, String otp) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        String storeOtp = otpService.getOtp(request.getEmail());
        if (storeOtp == null || !storeOtp.equals(otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        User user = userMapper.toUser(request);
        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFullName(request.getFirstName() + " " + request.getLastName());
        user.setEnabled(Boolean.TRUE);
        userRepository.save(user);

        NotificationEvent event = NotificationEvent.builder()
                .channel(EMAIL)
                .recipient(user.getEmail())
                .subject("Welcome to CHIPPO Dlearning")
                .templateCode("welcome-email")
                .build();
        kafkaTemplate.send("notification-delivery", event);
        otpService.deleteOtp(request.getEmail());
        return userMapper.toUserResponse(user);
    }

    @Override
    public void sendOtpRegister(EmailRequest request) {
        String otp = generateOtp();
        otpService.saveOtp(request.getEmail(), otp);
        StringBuilder content = new StringBuilder();
        content.append("<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <meta charset=\"UTF-8\" />\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\n" +
                "    <title>Static Template</title>\n" +
                "\n" +
                "    <link\n" +
                "      href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap\"\n" +
                "      rel=\"stylesheet\"\n" +
                "    />\n" +
                "  </head>\n" +
                "  <body\n" +
                "    style=\"\n" +
                "      margin: 0;\n" +
                "      font-family: 'Poppins', sans-serif;\n" +
                "      background: #ffffff;\n" +
                "      font-size: 14px;\n" +
                "    \"\n" +
                "  >\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        max-width: 680px;\n" +
                "        margin: 0 auto;\n" +
                "        padding: 45px 30px 60px;\n" +
                "        background: #f4f7ff;\n" +
                "        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);\n" +
                "        background-repeat: no-repeat;\n" +
                "        background-size: 800px 452px;\n" +
                "        background-position: top center;\n" +
                "        font-size: 14px;\n" +
                "        color: #434343;\n" +
                "      \"\n" +
                "    >\n" +
                "      <header>\n" +
                "        <table style=\"width: 100%;\">\n" +
                "          <tbody>\n" +
                "            <tr style=\"height: 0;\">\n" +
                "              <td style=\"text-align: center;\">\n" +
                "   <img\n" +
                "                  alt=\"\"\n" +
                "                  src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo\"\n" +
                "                  height=\"30px\"\n" +
                "                />\n" +
                "      </td>\n" +
                "              <td style=\"text-align: right;\">\n" +
                "                <span\n" +
                "                  style=\"font-size: 16px; line-height: 30px; color: #ffffff;\"\n" +
                "                  >12 Nov, 2021</span\n" +
                "                >\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "          </tbody>\n" +
                "        </table>\n" +
                "      </header>\n" +
                "\n" +
                "      <main>\n" +
                "        <div\n" +
                "          style=\"\n" +
                "            margin: 0;\n" +
                "            margin-top: 70px;\n" +
                "            padding: 92px 30px 115px;\n" +
                "            background: #ffffff;\n" +
                "            border-radius: 30px;\n" +
                "            text-align: center;\n" +
                "          \"\n" +
                "        >\n" +
                "          <div style=\"width: 100%; max-width: 489px; margin: 0 auto;\">\n" +
                "            <h1\n" +
                "              style=\"\n" +
                "                margin: 0;\n" +
                "                font-size: 24px;\n" +
                "                font-weight: 500;\n" +
                "                color: #1f1f1f;\n" +
                "              \"\n" +
                "            >\n" +
                "              Your OTP\n" +
                "            </h1>\n" +
                "            <p\n" +
                "              style=\"\n" +
                "                margin: 0;\n" +
                "                margin-top: 17px;\n" +
                "                font-size: 16px;\n" +
                "                font-weight: 500;\n" +
                "              \"\n" +
                "            >\n" +
                content.append(request.getEmail()) +
                "            </p>\n" +
                "            <p\n" +
                "              style=\"\n" +
                "                margin: 0;\n" +
                "                margin-top: 17px;\n" +
                "                font-weight: 500;\n" +
                "                letter-spacing: 0.56px;\n" +
                "              \"\n" +
                "            >\n" +
                "              Thank you for choosing CHIPPO Dlearning. Use the following OTP\n" +
                "              to complete the procedure to change your email address. OTP is\n" +
                "              valid for\n" +
                "              <span style=\"font-weight: 600; color: #1f1f1f;\">30 minutes</span>.\n" +
                "              Do not share this code with others, including CHIPPO Dlearning\n" +
                "              employees.\n" +
                "            </p>\n" +
                "            <p\n" +
                "              style=\"\n" +
                "                margin: 0;\n" +
                "                margin-top: 60px;\n" +
                "                font-size: 40px;\n" +
                "                font-weight: 600;\n" +
                "                letter-spacing: 25px;\n" +
                "                color: #ba3d4f;\n" +
                "              \"\n" +
                "            >\n" +
                otp +
                "            </p>\n" +
                "          </div>\n" +
                "        </div>\n" +
                "\n" +
                "        <p\n" +
                "          style=\"\n" +
                "            max-width: 400px;\n" +
                "            margin: 0 auto;\n" +
                "            margin-top: 90px;\n" +
                "            text-align: center;\n" +
                "            font-weight: 500;\n" +
                "            color: #8c8c8c;\n" +
                "          \"\n" +
                "        >\n" +
                "          Need help? Ask at\n" +
                "          <a\n" +
                "            href=\"mailto:chippo156@gmail.com\"\n" +
                "            style=\"color: #499fb6; text-decoration: none;\"\n" +
                "            >archisketch@gmail.com</a\n" +
                "          >\n" +
                "          or visit our\n" +
                "          <a\n" +
                "            href=\"\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"color: #499fb6; text-decoration: none;\"\n" +
                "            >Help Center</a\n" +
                "          >\n" +
                "        </p>\n" +
                "      </main>\n" +
                "\n" +
                "      <footer\n" +
                "        style=\"\n" +
                "          width: 100%;\n" +
                "          max-width: 490px;\n" +
                "          margin: 20px auto 0;\n" +
                "          text-align: center;\n" +
                "          border-top: 1px solid #e6ebf1;\n" +
                "        \"\n" +
                "      >\n" +
                "        <p\n" +
                "          style=\"\n" +
                "            margin: 0;\n" +
                "            margin-top: 40px;\n" +
                "            font-size: 16px;\n" +
                "            font-weight: 600;\n" +
                "            color: #434343;\n" +
                "          \"\n" +
                "        >\n" +
                "         CHIPPO Dlearning\n" +
                "        </p>\n" +
                "        <p style=\"margin: 0; margin-top: 8px; color: #434343;\">\n" +
                "          Address 540, City, State.\n" +
                "        </p>\n" +
                "        <div style=\"margin: 0; margin-top: 16px;\">\n" +
                "          <a href=\"\" target=\"_blank\" style=\"display: inline-block;\">\n" +
                "            <img\n" +
                "              width=\"36px\"\n" +
                "              alt=\"Facebook\"\n" +
                "              src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook\"\n" +
                "            />\n" +
                "          </a>\n" +
                "          <a\n" +
                "            href=\"\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"display: inline-block; margin-left: 8px;\"\n" +
                "          >\n" +
                "            <img\n" +
                "              width=\"36px\"\n" +
                "              alt=\"Instagram\"\n" +
                "              src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram\"\n" +
                "          /></a>\n" +
                "          <a\n" +
                "            href=\"\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"display: inline-block; margin-left: 8px;\"\n" +
                "          >\n" +
                "            <img\n" +
                "              width=\"36px\"\n" +
                "              alt=\"Twitter\"\n" +
                "              src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter\"\n" +
                "            />\n" +
                "          </a>\n" +
                "          <a\n" +
                "            href=\"\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"display: inline-block; margin-left: 8px;\"\n" +
                "          >\n" +
                "            <img\n" +
                "              width=\"36px\"\n" +
                "              alt=\"Youtube\"\n" +
                "              src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube\"\n" +
                "          /></a>\n" +
                "        </div>\n" +
                "        <p style=\"margin: 0; margin-top: 16px; color: #434343;\">\n" +
                "          Copyright © 2022 Company. All rights reserved.\n" +
                "        </p>\n" +
                "      </footer>\n" +
                "    </div>\n" +
                "  </body>\n" +
                "</html>");
        String emailContent = content.toString();
        NotificationEvent event = NotificationEvent.builder()
                .channel(EMAIL)
                .recipient(request.getEmail())
                .templateCode(emailContent)
                .subject("OTP Code for Account Registration")
                .param(Map.of("otp", otp))
                .build();
        kafkaTemplate.send("notification-send-otp", event);

    }

    @Override
    public void sendOtpForgotPassword(EmailRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String otp = generateOtp();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(30);

        user.setOtp(otp);
        user.setOtpExpiredTime(expiryDate);


        String content = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Reset Your Password</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            background-color: #f4f4f4;\n" +
                "            padding: 20px;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 500px;\n" +
                "            margin: 0 auto;\n" +
                "            background: #ffffff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .otp {\n" +
                "            font-size: 24px;\n" +
                "            font-weight: bold;\n" +
                "            color: #3498db;\n" +
                "            letter-spacing: 4px;\n" +
                "            padding: 10px 0;\n" +
                "        }\n" +
                "        .button {\n" +
                "            display: inline-block;\n" +
                "            padding: 10px 20px;\n" +
                "            margin-top: 10px;\n" +
                "            background-color: #3498db;\n" +
                "            color: #ffffff;\n" +
                "            text-decoration: none;\n" +
                "            border-radius: 5px;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            margin-top: 20px;\n" +
                "            font-size: 12px;\n" +
                "            color: #888888;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h2>Password Reset Request</h2>\n" +
                "        <p>We received a request to reset your password. Use the OTP below to proceed:</p>\n" +
                "        <div class=\"otp\">" +
                otp +
                "</div>\n" +
                "        <p>This OTP is valid for 10 minutes.</p>\n" +
                "        <a href=\"#\" class=\"button\">Reset Password</a>\n" +
                "        <p>If you did not request this, please ignore this email.</p>\n" +
                "        <div class=\"footer\">\n" +
                "            &copy; 2025 Your Company | All rights reserved.\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>\n";

        userRepository.save(user);
        NotificationEvent event = NotificationEvent.builder()
                .channel(EMAIL)
                .recipient(user.getEmail())
                .subject("Reset Your Password")
                .templateCode(content)
                .build();
        kafkaTemplate.send("notification-send-otp",event);

    }

    @Override
    public VerifyOtpResponse verifyOtp(VerifyOtpRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if(user.getOtp() == null || !user.getOtp().equals(request.getOtp())){
            return VerifyOtpResponse.builder()
                    .isValid(false)
                    .build();
        }
        if(user.getOtpExpiredTime() == null || user.getOtpExpiredTime().isBefore(LocalDateTime.now())){
            return VerifyOtpResponse.builder()
                    .isValid(false)
                    .build();
        }
        return VerifyOtpResponse.builder()
                .isValid(true)
                .build();
    }

    @Override
    public ChangePasswordResponse resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setOtp(null);
        user.setOtpExpiredTime(null);
        userRepository.save(user);
        return ChangePasswordResponse.builder()
                .message("Reset password successfully")
                .success(true)
                .build();
    }

    public static String generateOtp() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 1; i <= 6; i++) {
            stringBuilder.append(random.nextInt(10));
        }
        return stringBuilder.toString();
    }

    @Override
    public UserResponse findByUsername(String username) {
        Optional<User> user = userRepository.findByEmail(username);
        return user.map(userMapper::toUserResponse).orElse(null);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public UserResponse myProfile() {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userMapper.toUserResponse(user);
    }
    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public void uploadAvatar(MultipartFile file) {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String url = cloudinaryService.uploadImage(file);
        user.setAvatar(url);
        userRepository.save(user);
    }
    @Override
    @PreAuthorize("isAuthenticated()")
    public String getAvatar() {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return (user.getAvatar() != null) ? user.getAvatar() : "";
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public PointsCurrentResponse getPointsCurrent() {
        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return PointsCurrentResponse.builder()
                .points(user.getPoints())
                .build();

    }
    @Override
    public User getUser() {
        return userRepository.findById(1L).orElse(null);
    }
}
