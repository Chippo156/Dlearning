package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.request.UpdateLessonRequest;
import org.learning.dlearning_backend.model.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    void updateLesson (UpdateLessonRequest request, @MappingTarget Lesson lesson);

}
