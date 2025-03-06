package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.NotificationResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.model.Notification;
import org.learning.dlearning_backend.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/current")
    public ResponseData<List<NotificationResponse>> getNotificationsForCurrentUser() {
        return ResponseData.<List<NotificationResponse>>builder()
                .code(200)
                .message("Success")
                .data(notificationService.getNotificationsForUserCurrent())
                .build();

    }

    @PutMapping("/mark-as-read/{id}")
    public ResponseData<Void> markAsReadNotification(@PathVariable  Long id) {
        notificationService.markAsRead(id);
        return ResponseData.<Void>builder()
                .code(200)
                .message("Mark as read successfully")
                .build();
    }
}
