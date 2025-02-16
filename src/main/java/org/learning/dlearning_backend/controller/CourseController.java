package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.CourseCreationResponse;
import org.learning.dlearning_backend.dto.response.CourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/courses")
public class CourseController {
    private final CourseService courseService;

    @PostMapping("/create-course")
    public ResponseData<CourseCreationResponse> createCourse(@RequestPart("course")CourseCreationRequest request,
                                                             @RequestPart(value = "file",required = false) MultipartFile file,
                                                             @RequestPart(value = "video",required = false) MultipartFile video
                                                             ) throws IOException {
        return ResponseData.<CourseCreationResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create Course Successfully")
                .data(courseService.createCourse(request,file,video))
                .build();
    }

    @GetMapping("/get-all-courses")
    public ResponseData<PageResponse<CourseResponse>> getAllCourses(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                    @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseData.<PageResponse<CourseResponse>>builder()
                .message("Get All Courses Successfully")
                .code(HttpStatus.OK.value())
                .data(courseService.getAllCourses(page,size))
                .build();
    }

}
