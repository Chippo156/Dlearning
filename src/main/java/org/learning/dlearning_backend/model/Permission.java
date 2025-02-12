package org.learning.dlearning_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Set;

@Entity(name = "Permission")
@Table(name = "permissions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission extends AbstractEntity<Long>{

    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
}
