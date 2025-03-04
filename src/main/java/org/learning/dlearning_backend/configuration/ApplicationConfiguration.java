package org.learning.dlearning_backend.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.model.Role;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.RoleRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
public class ApplicationConfiguration {

    PasswordEncoder passwordEncoder;
    @NonFinal
    @Value("${admin.username}")
    String adminUserName;

    @NonFinal
    @Value("${admin.password}")
    String adminPassword;

    @NonFinal
    @Value("${admin.email}")
    String adminEmail;

    RoleRepository roleRepository;
    UserRepository userRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            Optional<Role> userRole = roleRepository.findByName(PredefinedRole.USER_ROLE);
            log.info("User role: " + userRole);
            if (userRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());
            }

            Optional<Role> adminRole = roleRepository.findByName(PredefinedRole.ADMIN_ROLE);
            if (adminRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());
            }

            Optional<Role> teacherRole = roleRepository.findByName(PredefinedRole.TEACHER_ROLE);
            if (teacherRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.TEACHER_ROLE)
                        .description("Teacher role")
                        .build());
            }
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                Role roleADM = roleRepository.findByName(PredefinedRole.ADMIN_ROLE)
                        .orElseThrow(() -> new RuntimeException("Admin role not found"));
                User user = User.builder()
                        .email(adminUserName)
                        .firstName("Vo Van Nghia")
                        .lastName("Hiep")
                        .fullName(adminUserName)
                        .password(passwordEncoder.encode(adminPassword))
                        .role(roleADM)
                        .email(adminEmail)
                        .dateOfBirth(LocalDate.of(2003, 10, 2))
                        .enabled(true)
                        .build();
                userRepository.save(user);
                log.warn("Admin user has been created with default password: 123456, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }


}
