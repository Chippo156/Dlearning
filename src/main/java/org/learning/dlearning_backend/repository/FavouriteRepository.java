package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Favourite;
import org.learning.dlearning_backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    Page<Favourite> findByUser(User user, Pageable pageable);

    boolean existsByUserAndCourse(User user, Course course);

}
