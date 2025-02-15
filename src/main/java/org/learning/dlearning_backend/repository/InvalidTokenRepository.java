package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.InvalidDateToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidTokenRepository extends JpaRepository<InvalidDateToken, Long> {
    boolean existsById(String token);
}
