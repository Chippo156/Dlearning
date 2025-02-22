package org.learning.dlearning_backend.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.common.PredefinedRole;
import org.learning.dlearning_backend.dto.request.LessonCreationRequest;
import org.learning.dlearning_backend.dto.request.UpdateLessonRequest;
import org.learning.dlearning_backend.dto.response.LessonCreationResponse;
import org.learning.dlearning_backend.dto.response.UpdateLessonResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.LessonMapper;
import org.learning.dlearning_backend.model.Chapter;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Lesson;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.ChapterRepository;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.LessonRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.LessonService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final LessonMapper lessonMapper;

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public LessonCreationResponse createLesson(LessonCreationRequest request, MultipartFile video) throws IOException {
        var email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
//        if (!Objects.equals(user.getRole().getName(), PredefinedRole.TEACHER_ROLE)) {
//            throw new AppException(ErrorCode.ACCESS_DENIED);
//        }
        Course course = courseRepository.findById(request.getCourseId()).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        Chapter chapter = chapterRepository.findById(request.getChapterId()).orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_EXISTED));

        String videoUrl = cloudinaryService.uploadVideo(video, "courses").get("url").toString();

        Lesson lesson = Lesson.builder()
                .chapter(chapter)
                .lessonName(request.getLessonName())
                .description(request.getDescription())
                .videoUrl(videoUrl)
                .build();

        lessonRepository.save(lesson);

        return LessonCreationResponse.builder()
                .chapterId(chapter.getId())
                .courseId(course.getId())
                .lessonId(lesson.getId())
                .lessonName(lesson.getLessonName())
                .lessonDescription(lesson.getDescription())
                .videoUrl(lesson.getVideoUrl())
                .build();

    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('TEACHER', 'ADMIN')")
    public void deleteLesson(Long lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_EXISTED));
        Chapter chapter = lesson.getChapter();
        Course course = chapter.getCourse();
        User user = course.getAuthor();

        var email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User currentUser = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (Objects.equals(user.getId(), currentUser.getId())

                && Objects.equals(user.getRole().getName(), PredefinedRole.TEACHER_ROLE)
                && Objects.equals(currentUser.getRole().getName(), PredefinedRole.TEACHER_ROLE)
                || Objects.equals(currentUser.getRole().getName(), PredefinedRole.ADMIN_ROLE)
        ) {
            lessonRepository.delete(lesson);
        }else{
            throw new AppException(ErrorCode.FORBIDDEN);
        }
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('TEACHER', 'ADMIN')")
    public UpdateLessonResponse updateLesson(UpdateLessonRequest request, MultipartFile file) throws IOException {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        if (request != null && request.getLessonId() != null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

            boolean isAdmin = Objects.equals(user.getRole().getName(), PredefinedRole.ADMIN_ROLE);
            boolean isAuthor = Objects.equals(course.getAuthor().getId(), user.getId());

            if(!isAdmin && !isAuthor){
                throw new AppException(ErrorCode.FORBIDDEN);
            }

            Lesson lesson = lessonRepository.findById(request.getLessonId())
                    .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_EXISTED));

            lessonMapper.updateLesson(request, lesson);
            if(file != null && !file.isEmpty()){
                String videoUrl = cloudinaryService.uploadVideo(file, "courses").get("url").toString();
                lesson.setVideoUrl(videoUrl);
            }
            lessonRepository.save(lesson);

            return UpdateLessonResponse.builder()
                    .courseId(request.getCourseId())
                    .chapterId(request.getChapterId())
                    .chapterName(lesson.getChapter().getChapterName())
                    .lessonId(lesson.getId())
                    .lessonName(lesson.getLessonName())
                    .description(lesson.getDescription())
                    .videoUrl(lesson.getVideoUrl())
                    .build();
        }
        throw new AppException(ErrorCode.UPLOAD_LESSON_INVALID);

    }
}
