package org.learning.dlearning_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Certificate extends AbstractEntity<Long> {
    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "issue_date")
    @JsonFormat(pattern = "EEEE, dd MMMM yyyy")
    LocalDateTime issueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    Course course;

    @Column(name = "certificate_url")
    String certificateUrl;

    @Column(name = "description")
    String description;
}
