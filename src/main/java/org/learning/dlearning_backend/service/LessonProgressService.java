package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.LessonProgressRequest;
import org.learning.dlearning_backend.dto.response.LessonProgressResponse;
import org.learning.dlearning_backend.dto.response.UserCompletionResponse;

public interface LessonProgressService {

    UserCompletionResponse calculateUserCompletion(Long courseId);
    LessonProgressResponse markLessonAsComplete(LessonProgressRequest request);



}
