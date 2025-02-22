package org.learning.dlearning_backend.service;


import org.learning.dlearning_backend.dto.request.LessonCreationRequest;
import org.learning.dlearning_backend.dto.request.UpdateLessonRequest;
import org.learning.dlearning_backend.dto.response.LessonCreationResponse;
import org.learning.dlearning_backend.dto.response.UpdateLessonResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface LessonService {

    LessonCreationResponse createLesson(LessonCreationRequest request, MultipartFile video) throws IOException;

    void deleteLesson(Long lessonId);

    UpdateLessonResponse updateLesson(UpdateLessonRequest request , MultipartFile file) throws IOException;


}
