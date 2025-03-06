package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.common.RegistrationStatus;
import org.learning.dlearning_backend.dto.request.UserRegisterTeacherRequest;
import org.learning.dlearning_backend.dto.response.UserRegisterTeacherResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.RegisterTeacherMapper;
import org.learning.dlearning_backend.model.Role;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.RoleRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.NotificationService;
import org.learning.dlearning_backend.service.RegisterTeacherService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterTeacherServiceImpl implements RegisterTeacherService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RegisterTeacherMapper mapper;
    private final FileService fileService;
    private final NotificationService notificationService;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserRegisterTeacherResponse> getAllRegisterTeacher() {
        return userRepository.findAll()
                .stream()
                .filter(user ->
                        user.getRegistrationStatus() != null &&
                                user.getRegistrationStatus().equals(RegistrationStatus.PENDING) &&
                                user.getRole() != null && user.getRole().getName() != null && user.getRole().getName().equals(PredefinedRole.USER_ROLE))
                .map(mapper::toTeacherResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasAuthority('USER') and isAuthenticated()")
    public UserRegisterTeacherResponse registerTeacher(UserRegisterTeacherRequest request, MultipartFile cv, MultipartFile certificate) throws IOException, URISyntaxException {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        if (user.getRegistrationStatus() == null || user.getRegistrationStatus().equals(RegistrationStatus.REJECTED)) {

            String cvFileName = fileService.storeFile(cv, "upload");
            String certificateFileName = fileService.storeFile(certificate, "upload");

            log.info("cvFileName: {}", cvFileName);
            log.info("certificateFileName: {}", certificateFileName);

            request.setCvUrl("/upload/" + cvFileName);
            request.setCertificate("/upload/" + certificateFileName);

            mapper.toUpdateTeacher(request, user);
            user.setRegistrationStatus(RegistrationStatus.PENDING);
            userRepository.save(user);

            String message = "A new teacher has been registered";
            String title = "New Teacher Registration";
            String url = "/admin/teacher-applications";

            List<User> userAdmin = userRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
            for (User usersAdmin : userAdmin) {
                notificationService.createNotification(usersAdmin,user,  message, title, url);
            }
            return mapper.toTeacherResponse(user);
        }
        throw new AppException(ErrorCode.REGISTER_TEACHER_INVALID);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN') and isAuthenticated()")
    public UserRegisterTeacherResponse saveTeacher(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        String roleName = user.getRole().getName();
        Role role = roleRepository.findByName(PredefinedRole.TEACHER_ROLE)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        if(user.getRegistrationStatus().equals(RegistrationStatus.PENDING) && roleName.equals(PredefinedRole.USER_ROLE)){
            user.setRole(role);
            user.setRegistrationStatus(RegistrationStatus.APPROVED);
            userRepository.save(user);

            String message = "Your teacher application has been approved";
            String title = "Teacher Registration Approved";
            String url = "/teacher";

            List<User> userAdmin = userRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
            for (User usersAdmin : userAdmin){
                notificationService.createNotification(user, usersAdmin, message, title, url);
            }

            return mapper.toTeacherResponse(user);
        }
        throw new AppException(ErrorCode.REGISTER_TEACHER_INVALID);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN') and isAuthenticated()")
    public UserRegisterTeacherResponse rejectTeacher(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        String roleName = user.getRole().getName();
        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        if(user.getRegistrationStatus().equals(RegistrationStatus.PENDING) && roleName.equals(PredefinedRole.USER_ROLE)){
            user.setRole(role);
            user.setRegistrationStatus(RegistrationStatus.REJECTED);
            userRepository.save(user);

            String message = "Your teacher application has been rejected";
            String title = "Teacher Registration Rejected";
            String url = "/teacher";

            List<User> userAdmin = userRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
            for (User usersAdmin : userAdmin){
                notificationService.createNotification(user, usersAdmin, message, title, url);
            }
            return mapper.toTeacherResponse(user);
        }
        throw new AppException(ErrorCode.REGISTER_TEACHER_INVALID);

    }
}
