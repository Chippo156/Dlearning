package org.learning.dlearning_backend.service;

import java.util.concurrent.TimeUnit;

public interface RedisService {
    void save(String key, String value);
    void save(String key, String value, long timeOut, TimeUnit timeUnit);
    String get(String key);
    void delete(String key);
}
