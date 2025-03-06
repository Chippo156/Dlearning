package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.BuyCourseRequest;
import org.learning.dlearning_backend.dto.request.CourseCreationRequest;
import org.learning.dlearning_backend.dto.response.*;
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

    @Operation(summary = "Create Course", description = "Create Course")
    @ApiResponse(responseCode = "201", description = "Create Course Successfully",
            content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = CourseCreationResponse.class))
    )
    @PostMapping(value = "/create-course",produces = "application/json",consumes = {"multipart/form-data"})
    public ResponseData<CourseCreationResponse> createCourse(@RequestPart("course") CourseCreationRequest request,
                                                             @RequestPart(value = "file",required = false) MultipartFile file,
                                                             @RequestPart(value = "video",required = false) MultipartFile video
                                                             ) throws IOException {
        return ResponseData.<CourseCreationResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create Course Successfully")
                .data(courseService.createCourse(request,file,video))
                .build();
    }

    @Operation(summary = "Get All Courses", description = "Get All Courses")
    @ApiResponse(responseCode = "200", description = "Get All Courses Successfully",
            content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = PageResponse.class))
    )
    @GetMapping("/get-all-courses")
    public ResponseData<PageResponse<CourseResponse>> getAllCourses(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                    @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseData.<PageResponse<CourseResponse>>builder()
                .message("Get All Courses Successfully")
                .code(HttpStatus.OK.value())
                .data(courseService.getAllCourses(page,size))
                .build();
    }

    @Operation(summary = "Get Course By Id", description = "Get Course By Id")
    @ApiResponse(responseCode = "200", description = "Get Course Successfully",
            content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = CourseResponse.class))
    )
    @GetMapping("/{id}")
    public ResponseData<CourseResponse> getCourseById(@PathVariable Long id){
        return ResponseData.<CourseResponse>builder()
                .message("Get Course Successfully")
                .code(HttpStatus.OK.value())
                .data(courseService.getCourseById(id))
                .build();
    }


    @Operation(summary = "Buy Course", description = "Buy Course")
    @ApiResponse(responseCode = "201", description = "Buy Course Successfully",
            content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = BuyCourseResponse.class))
    )
    @PostMapping("/buy-course")
    public ResponseData<BuyCourseResponse> buyCourse(@RequestBody BuyCourseRequest request){
        return ResponseData.<BuyCourseResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Buy Course Successfully")
                .data(courseService.buyCourse(request))
                .build();
    }

    @Operation(summary = "Get All Courses By Author", description = "Get All Courses By Author")
    @ApiResponse(responseCode = "200", description = "Get All Courses By Author Successfully",
            content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = PageResponse.class))
    )
    @GetMapping("/get-info-course/{courseId}")
    public ResponseData<CourseChapterResponse> getInfoCourse(@PathVariable Long courseId){
        return ResponseData.<CourseChapterResponse>builder()
                .message("Get Info Course Successfully")
                .code(HttpStatus.OK.value())
                .data(courseService.getInfoCourse(courseId))
                .build();
    }

}
