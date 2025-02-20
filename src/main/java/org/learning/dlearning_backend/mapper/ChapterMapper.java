package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.request.ChapterCreationRequest;
import org.learning.dlearning_backend.dto.response.ChapterCreationResponse;
import org.learning.dlearning_backend.model.Chapter;
import org.learning.dlearning_backend.model.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChapterMapper {


    @Mapping(source = "courseId", target = "course.id")
    @Mapping(source = "chapterName", target = "chapterName")
    @Mapping(source = "description", target = "description")
    Chapter toChapter(ChapterCreationRequest request);


    @Mapping(target = "lessonId", source = "id")
    @Mapping(target = "lessonName", source = "lessonName")
    @Mapping(target = "videoUrl", source = "videoUrl")
    @Mapping(target = "lessonDescription", source = "description")
    ChapterCreationResponse.LessonDto toLessonDto(Lesson lesson);


    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "chapterName", target = "chapterName")

    ChapterCreationResponse toChapterCreationResponse(Chapter chapter);

}
