package org.learning.dlearning_backend.mapper;


import org.learning.dlearning_backend.dto.response.CourseChapterResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.model.Chapter;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Lesson;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public final class CourseChapterAndLessonMapper {

    CourseRepository courseRepository;

    public CourseChapterAndLessonMapper(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseChapterResponse getCourseChapterAndLesson(Long courseId){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        Set<CourseChapterResponse.ChapterDto> chapterDto = course.getChapters().stream()
                .map(this::mapToLessonDto)
                .collect(Collectors.toSet());

        return CourseChapterResponse.builder()
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .courseDescription(course.getDescription())
                .chapters(chapterDto)
                .build();
    }

    private CourseChapterResponse.ChapterDto mapToLessonDto(Chapter chapter){
        Set<CourseChapterResponse.LessonDto> lessonDto = chapter.getLessons().stream()
                .map(this::mapToLessonDto)
                .collect(Collectors.toSet());

        return CourseChapterResponse.ChapterDto.builder()
                .chapterId(chapter.getId())
                .chapterName(chapter.getChapterName())
                .lessonDto(lessonDto)
                .build();
    }
    private CourseChapterResponse.LessonDto mapToLessonDto(Lesson lesson){
        return CourseChapterResponse.LessonDto.builder()
                .lessonId(lesson.getId())
                .lessonName(lesson.getLessonName())
                .description(lesson.getDescription())
                .videoUrl(lesson.getVideoUrl())
                .build();
    }

}
