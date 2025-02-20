package org.learning.dlearning_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Enrollment extends AbstractEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("enrollments")
    User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnoreProperties("enrollments")
    Course course;

    boolean purchased;

    boolean isComplete;

    public void prePersist() {
        this.isComplete = false;
        this.purchased = true;
    }
}
