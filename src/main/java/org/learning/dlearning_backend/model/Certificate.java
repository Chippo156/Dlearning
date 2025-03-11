package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "certificates")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Certificate extends AbstractEntity<Long> {


    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "issue_date")
    String issueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "course_id")
    Course course;

    @Column(name = "certificate_url")
    String certificateUrl;

    @Column(name = "description")
    String description;
}
