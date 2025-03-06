package org.learning.dlearning_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CommentRequest;
import org.learning.dlearning_backend.dto.request.UpdateCommentRequest;
import org.learning.dlearning_backend.dto.response.*;
import org.learning.dlearning_backend.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/comment")
public class CommentController {

    private final CommentService commentService;


    @Operation(summary = "Create comment", description = "Create comment")
    @ApiResponse(responseCode = "200", description = "Create comment success",
            content = @Content(schema = @Schema(implementation = CommentResponse.class))
    )
    @PostMapping("/create-comment")
    public ResponseData<CommentResponse> createComment(@RequestBody @Valid CommentRequest request) {
        var result = commentService.createComment(request);
        return ResponseData.<CommentResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @Operation(summary = "Delete comment", description = "Delete comment")
    @ApiResponse(responseCode = "200", description = "Delete comment success",
            content = @Content(schema = @Schema(implementation = Void.class))
    )
    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseData<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete comment successfully")
                .build();
    }

    @Operation(summary = "Update comment", description = "Update comment")
    @ApiResponse(responseCode = "200", description = "Update comment success",
            content = @Content(schema = @Schema(implementation = UpdateCommentResponse.class))
    )
    @PutMapping("/update-comment/{commentId}")
    public ResponseData<UpdateCommentResponse> updateComment(@RequestBody UpdateCommentRequest request, @PathVariable Long commentId) {
        var result = commentService.updateComment(commentId, request);
        return ResponseData.<UpdateCommentResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @Operation(summary = "Get comment by post id", description = "Get comment by post id")
    @ApiResponse(responseCode = "200", description = "Get comment by post id success",
            content = @Content(schema = @Schema(implementation = PageResponse.class))
    )
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
