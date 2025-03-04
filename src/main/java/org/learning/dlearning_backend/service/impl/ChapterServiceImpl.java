package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.ChapterCreationRequest;
import org.learning.dlearning_backend.dto.response.ChapterCreationResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.ChapterMapper;
import org.learning.dlearning_backend.model.Chapter;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.ChapterRepository;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.ChapterService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ChapterMapper chapterMapper;

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public ChapterCreationResponse createChapter(ChapterCreationRequest request) {

        String email = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Course course = courseRepository.findById(request.getCourseId()).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        Chapter chapter = chapterMapper.toChapter(request);

        chapter.setCourse(course);
        chapterRepository.save(chapter);

        return ChapterCreationResponse.builder()
                .chapterId(chapter.getId())
                .chapterName(chapter.getChapterName())
                .description(chapter.getDescription())
                .userName(user.getFullName())
                .courseId(course.getId())
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public List<ChapterCreationResponse> getChaptersByCourseId(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));
        return course.getChapters().stream().map(chapterMapper::toChapterCreationResponse).toList();
    }
}
