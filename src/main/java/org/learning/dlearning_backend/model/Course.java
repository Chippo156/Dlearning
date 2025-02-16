package org.learning.dlearning_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.CourseLevel;

@Entity
@Table(name = "courses")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "wishlists"})
public class Course extends AbstractEntity<Long> {
    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "point", columnDefinition = "BIGINT DEFAULT 0")
    Long points;

    @Column(name = "duration")
    Integer duration; // in hours

    @Column(name = "language")
    String language;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    CourseLevel courseLevel;

    @Column(name = "thumbnail")
    String thumbnail;

    @Column(name = "video_url")
    String videoUrl;

    @Column(name = "quantity", columnDefinition = "BIGINT DEFAULT 0")
    Long quantity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    @JsonIgnore
    User author;

    @PrePersist
    private void prePersist() {
        if (this.quantity == null) {
            quantity = 0L;
        }
    }

}
