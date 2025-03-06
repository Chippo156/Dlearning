package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.response.InfoTeacherByCourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.StudentResponse;
import org.learning.dlearning_backend.model.User;

import java.math.BigDecimal;

public interface TeacherService {
    InfoTeacherByCourseResponse getInfoTeacherByCourse(Long courseId);
    PageResponse<StudentResponse> getStudentByPurchasedCourse(int page, int size);

    BigDecimal avgRating(User user);

}
