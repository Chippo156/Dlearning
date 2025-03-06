package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.NotificationResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.NotificationMapper;
import org.learning.dlearning_backend.model.Notification;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.NotificationRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.NotificationService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;


    @Override
    @PreAuthorize("isAuthenticated()")
    public List<NotificationResponse> getNotificationsForUserCurrent() {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        List<Notification> notifications = notificationRepository.findByUserIdOrderByIdDesc(user.getId());
        if (notifications == null || notifications.isEmpty()) {
            return Collections.emptyList();
        }
        return notifications.stream().map(notificationMapper::toNotificationResponse).toList();
    }

    @Override
    public void createNotification(User receiver, User sender, String message, String title, String url) {
        Notification notification = Notification.builder()
                .user(receiver)
                .sender(sender)
                .avatarUrl(sender.getAvatar())
                .message(message)
                .title(title)
                .url(url)
                .isRead(false)
                .build();
        notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(receiver.getEmail(),"/queue/notifications", notification);

        log.info("Sending notification to user : {}",receiver.getEmail());
    }

    @Override
    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_EXISTED));
        notificationRepository.delete(notification);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_EXISTED));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

}
