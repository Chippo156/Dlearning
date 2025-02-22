package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.response.UserCompletionResponse;

public interface LessonProgressService {

    UserCompletionResponse calculateUserCompletion(Long courseId);

}
