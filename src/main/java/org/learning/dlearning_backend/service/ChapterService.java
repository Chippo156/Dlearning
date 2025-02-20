package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.ChapterCreationRequest;
import org.learning.dlearning_backend.dto.response.ChapterCreationResponse;

import java.util.List;

public interface ChapterService {

    ChapterCreationResponse createChapter(ChapterCreationRequest request);

    List<ChapterCreationResponse> getChaptersByCourseId(Long courseId);

}
