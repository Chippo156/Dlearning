package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpServiceImpl {

    private final RedisTemplate<String,Object> redisTemplate;

    public void saveOtp(String email, String otp){
        redisTemplate.opsForValue().set(email, otp, 30, TimeUnit.MINUTES);
    }
    public String getOtp(String email) {
        return redisTemplate.opsForValue().get(email).toString();
    }
    public void deleteOtp(String email) {
        redisTemplate.delete(email);
    }
}
