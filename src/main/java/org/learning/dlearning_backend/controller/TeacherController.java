package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.InfoTeacherByCourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.StudentResponse;
import org.learning.dlearning_backend.service.TeacherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/teacher")
public class TeacherController {
    private final TeacherService teacherService;


    @GetMapping("/info-teacher-by-course/{courseId}")
    public ResponseData<InfoTeacherByCourseResponse> getInfoTeacherByCourse(@PathVariable Long courseId){
        return ResponseData.<InfoTeacherByCourseResponse>builder()
                .data(teacherService.getInfoTeacherByCourse(courseId))
                .message("Get info teacher by course successfully")
                .code(200)
                .build();
    }

    @GetMapping("/student-by-purchased-course")
    public ResponseData<PageResponse<StudentResponse>> studentByPurchasedCourse(int page, int size){
        return ResponseData.<PageResponse<StudentResponse>>builder()
                .data(teacherService.getStudentByPurchasedCourse(page, size))
                .message("Get student by purchased course successfully")
                .code(200)
                .build();
    }
}
