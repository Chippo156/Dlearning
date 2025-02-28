package org.learning.dlearning_backend.dto.event;

import lombok.*;

import java.util.Map;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationEvent {
    private String channel;
    private String recipient;
    private String templateCode;
    private String subject;
    Map<String, Object> param;
}
