package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
