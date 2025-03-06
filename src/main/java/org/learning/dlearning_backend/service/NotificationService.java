package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.response.NotificationResponse;
import org.learning.dlearning_backend.model.Notification;
import org.learning.dlearning_backend.model.User;

import java.util.List;

public interface NotificationService {
    List<NotificationResponse> getNotificationsForUserCurrent();
    void createNotification(User receiver, User sender , String message, String title, String url);
    void deleteNotification(Long notificationId);
    void markAsRead(Long notificationId);
}
