package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.response.NotificationResponse;
import org.learning.dlearning_backend.model.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "username" , source = "sender.fullName")
    @Mapping(target = "senderId" , source = "sender.id")
    NotificationResponse toNotificationResponse(Notification notification);
}
