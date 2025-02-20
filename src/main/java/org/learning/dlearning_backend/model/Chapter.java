package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "chapters")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Chapter extends AbstractEntity<Long> {

    @Column(name="chapter_name", nullable = false)
    String chapterName;

    @Column(name="description", columnDefinition = "MEDIUMTEXT")
    String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    Course course;


}
