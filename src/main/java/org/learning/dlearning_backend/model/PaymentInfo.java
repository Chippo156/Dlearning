package org.learning.dlearning_backend.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;

@Getter
@Setter
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentInfo {

    String reference;
    BigDecimal amount;
    String description;
    Instant createdAt = Instant.now();
    Duration expiresIn;
    String ipAddress;

    public Instant getExpiredAt() {
        return createdAt.plus(expiresIn);
    }

}
