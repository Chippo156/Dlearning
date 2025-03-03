package org.learning.dlearning_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CommentRequest;
import org.learning.dlearning_backend.dto.request.UpdateCommentRequest;
import org.learning.dlearning_backend.dto.response.CommentResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.dto.response.UpdateCommentResponse;
import org.learning.dlearning_backend.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create-comment")
    public ResponseData<CommentResponse> createComment(@RequestBody @Valid CommentRequest request) {
        var result = commentService.createComment(request);
        return ResponseData.<CommentResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseData<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete comment successfully")
                .build();
    }

    @PutMapping("/update-comment/{commentId}")
    public ResponseData<UpdateCommentResponse> updateComment(@RequestBody UpdateCommentRequest request, @PathVariable Long commentId) {
        var result = commentService.updateComment(commentId, request);
        return ResponseData.<UpdateCommentResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @GetMapping("/get-comment-by-post-id/{postId}")
    public ResponseData<PageResponse<CommentResponse>> getCommentByPostId(@PathVariable Long postId,
                                                         @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                         @RequestParam(value = "size", required = false, defaultValue = "4") int size
    ) {
        var result = commentService.getCommentByPostId(postId, page, size);
        return ResponseData.<PageResponse<CommentResponse>>builder()
                .code(HttpStatus.OK.value())
                .data(result)
                .build();
    }
}
