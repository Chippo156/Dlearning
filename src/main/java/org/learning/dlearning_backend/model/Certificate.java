package org.learning.dlearning_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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


    String name;

    String issueDate;

    User user;

    Course course;

    String certificateUrl;

    String description;
}
