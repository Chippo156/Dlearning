package org.learning.dlearning_backend.mapper;


import org.learning.dlearning_backend.dto.response.BuyCourseResponse;
import org.learning.dlearning_backend.dto.response.CoursePurchaseResponse;
import org.learning.dlearning_backend.model.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.title", target = "title")
    @Mapping(source = "course.author.fullName" ,target = "author")
    @Mapping(source = "course.thumbnail", target = "thumbnail")
    @Mapping(source = "course.points", target = "points")
    @Mapping(source = "course.createdAt", target = "createdAt")
    @Mapping(source = "course.courseLevel", target = "courseLevel")
    BuyCourseResponse toBuyCourseResponse(Enrollment enrollment);

    @Mapping(source = "user.id", target ="userId")
    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "purchased", target = "purchased")
    CoursePurchaseResponse toCoursePurchaseResponse(Enrollment enrollment);
}
