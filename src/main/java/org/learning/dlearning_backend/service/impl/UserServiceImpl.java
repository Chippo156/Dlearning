package org.learning.dlearning_backend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.response.PointsCurrentResponse;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.UserMapper;
import org.learning.dlearning_backend.model.Role;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.RoleRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.UserService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.mapstruct.Mapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


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
    @Override
    public UserResponse createUser(UserCreationRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        User user = userMapper.toUser(request);
        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFullName(request.getFirstName()+ " " + request.getLastName());
        user.setEnabled(Boolean.TRUE);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
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
