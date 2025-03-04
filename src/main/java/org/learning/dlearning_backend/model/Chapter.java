package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;
import java.util.Set;
@Entity
@Table(name = "chapters")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Chapter extends AbstractEntity<Long> {

    @Column(name = "chapter_name", nullable = false)
    String chapterName;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @OneToMany(mappedBy = "chapter", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    transient Set<Lesson> lessons;

    @OneToMany(mappedBy = "chapter", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    transient List<Review> reviews;


}
