package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.CommentRequest;
import org.learning.dlearning_backend.dto.request.UpdateCommentRequest;
import org.learning.dlearning_backend.dto.response.CommentResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.UpdateCommentResponse;

import java.util.List;

public interface CommentService {

    PageResponse<CommentResponse> getCommentByPostId(Long postId, Integer page, Integer size);

    CommentResponse createComment(CommentRequest request);

    UpdateCommentResponse updateComment(Long commentId, UpdateCommentRequest request);

    void deleteComment(Long commentId);

}
