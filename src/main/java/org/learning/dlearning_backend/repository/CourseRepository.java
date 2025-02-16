package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
