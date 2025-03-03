package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "Post")
@Table(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Post extends AbstractEntity<Long> {

    @Column(name = "title")
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "image")
    private String image;

    @Column(name = "like_count", columnDefinition = "INTEGER DEFAULT 0")
    private Integer likeCount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;



    @PrePersist
    protected void onCreate() {
        if (this.likeCount == null) {
            this.likeCount = 0;
        }
    }
}
