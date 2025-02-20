package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Lesson;
import org.learning.dlearning_backend.model.LessonProgress;
import org.learning.dlearning_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {


    @Query("SELECT COUNT(lp) from LessonProgress lp where lp.user = :user and lp.lesson.chapter.course = :course and lp.completed = :completed")
    long countByUserAndCourseAndCompleted(User user, Course course, Boolean completed);


    @Query("SELECT lp from LessonProgress lp where lp.user = :user and lp.lesson.chapter.course = :course and lp.completed = :completed")
    List<LessonProgress> findByUserAndCourse(User user, Course course, Boolean completed);

    LessonProgress findByUserAndLesson(User user, Lesson lesson);

    @Query("SELECT COUNT(lp) from LessonProgress lp where lp.user = :user and lp.lesson.chapter.course = :course")
    long totalLessonComplete(User user, Course course);

}
