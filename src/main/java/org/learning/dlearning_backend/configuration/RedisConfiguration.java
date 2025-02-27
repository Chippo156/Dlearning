package org.learning.dlearning_backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfiguration {

    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory); // set connection factory
        redisTemplate.setKeySerializer(new StringRedisSerializer()); // set key serializer
        redisTemplate.setValueSerializer(new StringRedisSerializer()); // set value serializer
        redisTemplate.setHashKeySerializer(new StringRedisSerializer()); // set hash key serializer
        redisTemplate.setHashValueSerializer(new StringRedisSerializer()); // set hash value serializer
        return redisTemplate;
    }
}
