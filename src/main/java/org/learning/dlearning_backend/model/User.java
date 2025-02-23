package org.learning.dlearning_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.Gender;

import java.time.LocalDate;
import java.util.Set;

@Entity(name = "User")
@Table(name = "users")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends AbstractEntity<Long>{

    @Column(name = "email", nullable = false, unique = true)
    @Email
    @NotBlank
    String email;

    @Column(name = "password",nullable = false)
    String password;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "first_name", nullable = false)
    String firstName;

    @Column(name = "last_name", nullable = false)
    String lastName;

    @Column(name = "avatar")
    String avatar;

    @Column(name = "phone_number")
    String phoneNumber;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @Column(name = "date_of_birth")
    LocalDate dateOfBirth;

    @Column(name = "address")
    String address;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "zipcode")
    String zipcode;

    @Column(name = "enabled", nullable = false)
    Boolean enabled;

    @Column(name = "expertise")
    String expertise;

    @Column(name = "year_of_experience")
    Double yearOfExperience;

    @Column(name = "bio")
    String bio;

    @Column(name = "certificate")
    String certificate;

    @Column(name = "cv_url")
    String cvUrl;

    @Column(name = "facebook_url")
    String facebookUrl;

    @Column(name = "points")
    Long points;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    Role role;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Course> courses;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "reviews"})
    Set<Review> reviews;


}
