package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity(name = "Role")
@Table(name = "roles")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role extends AbstractEntity<Long>{

    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;

    @ManyToMany
    transient Set<Permission> permissions;

}
