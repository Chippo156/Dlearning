package org.learning.dlearning_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;
import org.learning.dlearning_backend.common.CourseLevel;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serial;
import java.io.Serializable;

@Document(indexName = "course")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class CourseElasticSearch implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    Long id;

    @Field(name = "title" , type = FieldType.Text)
    String title;

    @Field(name = "description" , type = FieldType.Text)
    String description;

    @Field(name = "author" , type = FieldType.Text)
    String author;

    @Field(name = "points" , type = FieldType.Long)
    Long points;

    @Field(name = "duration" , type = FieldType.Integer)
    Integer duration; // in hours

    @Field(name = "language" , type = FieldType.Text)
    String language;

    @Field(name = "courseLevel" , type = FieldType.Text)
    CourseLevel courseLevel;

    @Field(name = "thumbnail" , type = FieldType.Text)
    String thumbnail;

    @Field(name = "quantity" , type = FieldType.Long)
    Long quantity;
}
