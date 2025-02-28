package org.learning.dlearning_backend.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic notificationDeliveryTopic(){
        return TopicBuilder.name("notification-delivery")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
