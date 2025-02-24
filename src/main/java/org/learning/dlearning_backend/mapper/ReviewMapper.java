package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.response.ReviewLessonResponse;
import org.learning.dlearning_backend.dto.response.ReviewResponse;
import org.learning.dlearning_backend.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {


    @Mapping(source = "user.fullName", target = "name")
    @Mapping(source = "user.avatar", target = "avatar")
    @Mapping(source = "replies", target = "replies")
    ReviewResponse toCommentResponse(Review comment);


    @Mapping(source = "user.fullName", target = "name")
    @Mapping(source = "user.avatar", target = "avatar")
    @Mapping(source = "replies", target = "replies")
    @Mapping(source = "course.id",target= "courseId")
    @Mapping(source = "chapter.id",target= "chapterId")
    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "reviewId", source = "id")
    ReviewLessonResponse toResponseLesson(Review comment);




}
