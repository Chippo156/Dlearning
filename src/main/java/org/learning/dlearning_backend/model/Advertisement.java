package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.AdsStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "advertisements")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Advertisement extends AbstractEntity<Long>{

    @Column(name = "title", nullable = false, length = 100)
    String title;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "contact_email", nullable = false)
    String contactEmail;

    @Column(name = "contact_phone", nullable = false)
    String contactPhone;

    @Column(name = "price")
    BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    Course course;

    @Column(name = "image_ads")
    String image;

    @Column(name = "location")
    String location;

    @Column(name = "link")
    String link;

    @Column(name = "start_date")
    LocalDate startDate;

    @Column(name = "end_date")
    LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "ads_status")
    AdsStatus adsStatus;
}
