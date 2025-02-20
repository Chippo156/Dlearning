package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
