package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.UserProfileRequest;
import org.learning.dlearning_backend.dto.response.UserProfileResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.ProfileMapper;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.ProfileService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final ProfileMapper profileMapper;
    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public void updateProfile(UserProfileRequest userProfileRequest) {

        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        profileMapper.updateUser(userProfileRequest, user);

        if(userProfileRequest.getFirstName() != null && userProfileRequest.getLastName() != null){
            user.setFullName(userProfileRequest.getFirstName() + " " + userProfileRequest.getLastName());
        }

        userRepository.save(user);
        log.info("User profile updated successfully for user with email: {}", email);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public UserProfileResponse getInfoUser() {

        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        return profileMapper.getInfoUser(user);
    }
}
