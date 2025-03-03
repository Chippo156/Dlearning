package org.learning.dlearning_backend.controller;

import com.turkraft.springfilter.boot.Filter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.PostCreationRequest;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.PostCreationResponse;
import org.learning.dlearning_backend.dto.response.PostResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
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

    @PostMapping("/create-post")
    public ResponseData<PostCreationResponse> createPost(@RequestPart("post") PostCreationRequest request
            , @RequestPart(value = "file",required = false) MultipartFile file){
        return ResponseData.<PostCreationResponse>builder()
                .message("Create Post Successfully")
                .data(postService.createPost(request,file))
                .build();
    }

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
    @DeleteMapping("/delete-post/{postId}")
    public ResponseData<Void> deletePost(@PathVariable Long postId){
        postService.deletePost(postId);
        return ResponseData.<Void>builder()
                .message("Delete Post Successfully")
                .code(200)
                .build();
    }

}
