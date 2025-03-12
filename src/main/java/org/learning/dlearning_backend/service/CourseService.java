package org.learning.dlearning_backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.learning.dlearning_backend.dto.request.BuyCourseRequest;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.CourseElasticSearch;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import java.io.IOException;

public interface CourseService {
    CourseCreationResponse createCourse(CourseCreationRequest request , MultipartFile file, MultipartFile video) throws IOException;
    PageResponse<CourseResponse> getAllCourses(int page, int size);
    CourseResponse getCourseById(Long id);
    BuyCourseResponse buyCourse(BuyCourseRequest request);
    CourseChapterResponse getInfoCourse(Long courseId);

    PageResponse<CourseElasticSearch> searchCourse(String keyword, int page, int size);

    void sysDataToElasticSearch();
    PageResponse<CourseResponse> getCoursesCache(int page, int size) throws JsonProcessingException;

    PageResponse<CourseResponse> getCourseWithSortMultiFieldAndSearch(int page, int size, String sortBy ,String... search);
    PageResponse<CourseResponse> getCourseWithSortAndSpecification(int page, int size, String sortBy ,String... search);

    PageResponse<CourseResponse> findCourseByOldest(int page, int size);
    PageResponse<CourseResponse> findCourseByNewest(int page, int size);



}
