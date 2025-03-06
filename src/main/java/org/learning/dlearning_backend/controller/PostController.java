package org.learning.dlearning_backend.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.PostCreationRequest;
import org.learning.dlearning_backend.dto.request.UpdatePostRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.model.Post;
import org.learning.dlearning_backend.service.PostService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/posts")
public class PostController {
    private final PostService postService;


    @Operation(summary = "Create Post", description = "Create Post")
    @ApiResponse(responseCode = "200", description = "Create Post Successfully",
     content = @Content(schema = @Schema(implementation = PostCreationResponse.class))
    )
    @PostMapping(value = "/create-post",produces = "application/json",consumes = {"multipart/form-data"})
    public ResponseData<PostCreationResponse> createPost(@RequestPart("post") PostCreationRequest request
            , @RequestPart(value = "file",required = false) MultipartFile file){
        return ResponseData.<PostCreationResponse>builder()
                .message("Create Post Successfully")
                .data(postService.createPost(request,file))
                .build();
    }


    @Operation(summary = "Get All Post", description = "Get All Post")
    @ApiResponse(responseCode = "200", description = "Get All Post Successfully",
     content = @Content(schema = @Schema(implementation = PageResponse.class))
    )
    @GetMapping("/get-all-post")
    public ResponseData<PageResponse<PostResponse>> getAllPost(
            @Filter Specification<Post> spec,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseData.<PageResponse<PostResponse>>builder()
                .message("Get All Post Successfully")
                .data(postService.getAllPost(spec,page,size))
                .code(200)
                .build();
    }

    @Operation(summary = "Get Post Current Login", description = "Get Post Current Login")
    @ApiResponse(responseCode = "200", description = "Get Get Post Current Login Successfully",
     content = @Content(schema = @Schema(implementation = PostResponse.class))
    )
    @GetMapping("/get-post-current-login")
    public ResponseData<PageResponse<PostResponse>> getPostCurrentLogin(
            @Filter Specification<Post> spec,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "3") int size){
        return ResponseData.<PageResponse<PostResponse>>builder()
                .message("Get Post Current Login Successfully")
                .data(postService.getPostCurrentLogin(spec,page,size))
                .code(200)
                .build();
    }

    @Operation(summary = "Update Post By Id", description = "Update Post By Id")
    @ApiResponse(responseCode = "200", description = "Update Post By Id Successfully",
     content = @Content(schema = @Schema(implementation = UpdatePostResponse.class))
    )
    @PutMapping("/update-post/{postId}")
    public ResponseData<UpdatePostResponse> updatePost(@PathVariable Long postId, @RequestPart(value = "image",required = false) MultipartFile file
               , @RequestPart("request")UpdatePostRequest request) {
        return ResponseData.<UpdatePostResponse>builder()
                .message("Update Post Successfully")
                .code(200)
                .data(postService.updatePost(postId,request,file))
                .build();
    }

    @Operation(summary = "Delete Post By Id", description = "Delete Post By Id")
    @ApiResponse(responseCode = "200", description = "Delete Post By Id Successfully",
     content = @Content(schema = @Schema(implementation = Void.class))
    )
    @DeleteMapping("/delete-post/{postId}")
    public ResponseData<Void> deletePost(@PathVariable Long postId){
        postService.deletePost(postId);
        return ResponseData.<Void>builder()
                .message("Delete Post Successfully")
                .code(200)
                .build();
    }

}
