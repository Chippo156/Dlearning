package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.common.PaymentMethodName;
import org.learning.dlearning_backend.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    Optional<PaymentMethod> findByMethodName(PaymentMethodName methodName);
}
