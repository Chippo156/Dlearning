package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.IsCourseCompleteRequest;
import org.learning.dlearning_backend.dto.response.BuyCourseResponse;
import org.learning.dlearning_backend.dto.response.CoursePurchaseResponse;
import org.learning.dlearning_backend.dto.response.IsCompletionCourseResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping("/get-course-by-user")
    public ResponseData<List<BuyCourseResponse>> getCourseByUserCurrent(){
        return ResponseData.<List<BuyCourseResponse>>builder()
                .message("Get Course By User Successfully")
                .code(200)
                .data(enrollmentService.getCourseByUserCurrent())
                .build();
    }

    @GetMapping("/check-course-purchased/{courseId}")
    public ResponseData<CoursePurchaseResponse> checkCoursePurchase(@PathVariable Long courseId){
        return ResponseData.<CoursePurchaseResponse>builder()
                .message("Check Course Purchase Successfully")
                .code(200)
                .data(enrollmentService.checkCoursePurchase(courseId))
                .build();
    }

    @PostMapping("/is-complete-course")
    public ResponseData<IsCompletionCourseResponse> isCompleteCourse(@RequestBody IsCourseCompleteRequest request){
        return ResponseData.<IsCompletionCourseResponse>builder()
                .message("Check Course Completion Successfully")
                .code(200)
                .data(enrollmentService.isCompleteCourse(request))
                .build();
    }

}
