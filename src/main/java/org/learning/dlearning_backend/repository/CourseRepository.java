package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT count(*) from Review r where r.user.id = :userId")
    int totalReview(Long userId);
}
