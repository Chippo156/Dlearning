package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Enrollment;
import org.learning.dlearning_backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByUserAndCourse(User user, Course course);

    List<Enrollment> findCourseByUser(User user);

    @Query("SELECT e from Enrollment e where e.user = :user and e.course = :course")
    Optional<Enrollment> checkPurchase( User user, Course course);


    @Query("SELECT COUNT(DISTINCT e.user.id) FROM Enrollment e WHERE e.course.author.id = :teacherId")
    int totalStudentsByTeacher(Long teacherId);

    @Query("SELECT e.isComplete from Enrollment e WHERE e.user = :user and e.course = :course")
    boolean isCourseCompleteByUser(User user, Course course);

    Optional<Enrollment> findByCourseAndUser(Course course, User user);

    @Query("SELECT e from Enrollment  e WHERE e.course.author.id = :teacherId AND e.purchased = true")
    Page<Enrollment> findPurchaseUsersByTeacherId(Long teacherId, Pageable pageable);


}
