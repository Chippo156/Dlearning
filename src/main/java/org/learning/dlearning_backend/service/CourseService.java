package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.BuyCourseRequest;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.BuyCourseResponse;
import org.learning.dlearning_backend.dto.response.CourseCreationResponse;
import org.learning.dlearning_backend.dto.response.CourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.model.Course;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CourseService {
    CourseCreationResponse createCourse(CourseCreationRequest request , MultipartFile file, MultipartFile video) throws IOException;
    PageResponse<CourseResponse> getAllCourses(int page, int size);
    CourseResponse getCourseById(Long id);
    BuyCourseResponse buyCourse(BuyCourseRequest request);

}
