package org.learning.dlearning_backend.dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    Long id;
    Long senderId;
    String username;
    String title;
    String message;
    Boolean isRead;
    String url;
    String avatarUrl;
}
