package org.learning.dlearning_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "notifications")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Notification extends AbstractEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonIgnore
    User sender;

    @Column(name = "title")
    String title;

    @Column(name = "message")
    String message;

    @Column(name = "is_read")
    Boolean isRead;

    String url;

    @Column(name = "avatarUrl")
    String avatarUrl;

}
