package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.IsCourseCompleteRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @Operation(summary = "Get Course By User", responses = {
            @ApiResponse(responseCode = "200", description = "Get Course By User Successfully",
                    content = @Content(schema = @Schema(implementation = BuyCourseResponse.class)))
    })
    @GetMapping("/get-course-by-user")
    public ResponseData<List<BuyCourseResponse>> getCourseByUserCurrent() {
        return ResponseData.<List<BuyCourseResponse>>builder()
                .message("Get Course By User Successfully")
                .code(200)
                .data(enrollmentService.getCourseByUserCurrent())
                .build();
    }


    @Operation(summary = "Buy Course", responses = {
            @ApiResponse(responseCode = "200", description = "Buy Course Successfully",
                    content = @Content(schema = @Schema(implementation = BuyCourseResponse.class)))
    })
    @GetMapping("/check-course-purchased/{courseId}")
    public ResponseData<CoursePurchaseResponse> checkCoursePurchase(@PathVariable Long courseId) {
        return ResponseData.<CoursePurchaseResponse>builder()
                .message("Check Course Purchase Successfully")
                .code(200)
                .data(enrollmentService.checkCoursePurchase(courseId))
                .build();
    }

    @Operation(summary = "Buy Course", responses = {
            @ApiResponse(responseCode = "200", description = "Buy Course Successfully",
                    content = @Content(schema = @Schema(implementation = BuyCourseResponse.class)))
    })
    @PostMapping("/is-complete-course")
    public ResponseData<IsCompletionCourseResponse> isCompleteCourse(@RequestBody IsCourseCompleteRequest request) {
        return ResponseData.<IsCompletionCourseResponse>builder()
                .message("Check Course Completion Successfully")
                .code(200)
                .data(enrollmentService.isCompleteCourse(request))
                .build();
    }

}
