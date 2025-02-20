package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Chapter;
import org.learning.dlearning_backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    Optional<Chapter> findByChapterNameAndCourse(String chapterName, Course course);

    @Query("SELECT c FROM Chapter c WHERE c.course.id = :courseId")
    List<Chapter> findByCourseId(Long courseId);
}
