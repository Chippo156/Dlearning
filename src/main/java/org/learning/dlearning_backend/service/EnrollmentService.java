package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.IsCourseCompleteRequest;
import org.learning.dlearning_backend.dto.response.BuyCourseResponse;
import org.learning.dlearning_backend.dto.response.CoursePurchaseResponse;
import org.learning.dlearning_backend.dto.response.IsCompletionCourseResponse;

import java.util.List;

public interface EnrollmentService {
    List<BuyCourseResponse> getCourseByUserCurrent();
    CoursePurchaseResponse checkCoursePurchase(Long courseId);

    IsCompletionCourseResponse isCompleteCourse(IsCourseCompleteRequest request);
}
