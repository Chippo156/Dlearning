package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.CourseCreationResponse;
import org.learning.dlearning_backend.dto.response.CourseResponse;
import org.learning.dlearning_backend.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    Course toCourse(CourseCreationRequest request);

    @Mapping(source = "author.fullName",target = "author")
    CourseCreationResponse toCourseCreationResponse(Course course);

    @Mapping(source = "author.fullName", target = "author")
    @Mapping(target = "averageRating", ignore = true)
    CourseResponse toCourseResponse(Course course);
}
