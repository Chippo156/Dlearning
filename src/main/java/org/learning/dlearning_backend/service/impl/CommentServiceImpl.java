package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.CommentRequest;
import org.learning.dlearning_backend.dto.request.UpdateCommentRequest;
import org.learning.dlearning_backend.dto.response.CommentResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.UpdateCommentResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.CommentMapper;
import org.learning.dlearning_backend.model.Comment;
import org.learning.dlearning_backend.model.Post;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CommentRepository;
import org.learning.dlearning_backend.repository.PostRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.BannedWordService;
import org.learning.dlearning_backend.service.CommentService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final BannedWordService bannedWordsService;


    @Override
    @PreAuthorize("isAuthenticated()")
    public PageResponse<CommentResponse> getCommentByPostId(Long postId, Integer page, Integer size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Comment> parentComments = commentRepository.findCommentByPostIdAndParentCommentIsNull(postId,pageable);

        List<CommentResponse> responses = parentComments.getContent().stream()
                .map(comment -> {
                    CommentResponse response = commentMapper.toCommentResponse(comment);
                    List<CommentResponse> replies = comment.getReplies().stream().map(commentMapper::toCommentResponse).toList();
                    response.setReplies(replies);
                    return response;
                }).toList();

        return PageResponse.<CommentResponse>builder()
                .result(responses)
                .currentPage(page)
                .totalElements(parentComments.getTotalElements())
                .totalPages(parentComments.getTotalPages())
                .pageSize(pageable.getPageSize())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public CommentResponse createComment(CommentRequest request) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        Comment parentComment = null;
        if(request.getParentCommentId() != null) {
             parentComment = commentRepository.findById(request.getParentCommentId())
                    .orElseThrow(() -> new AppException(ErrorCode.PARENT_COMMENT_NOT_EXISTED));
        }
        if(request.getContent() == null || request.getContent().isEmpty()){
            throw new AppException(ErrorCode.CONTENT_COMMENT_INVALID);
        }
        if(bannedWordsService.containsBannedWord(request.getContent())){
            throw new AppException(ErrorCode.BANNED_WORD_EXISTED);
        }

        Comment comment = commentMapper.toComment(request);
        comment.setUser(user);
        comment.setPost(post);
        comment.setParentComment(parentComment);

        commentRepository.save(comment);
        return commentMapper.toCommentResponse(comment);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public UpdateCommentResponse updateComment(Long commentId, UpdateCommentRequest request) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));


        if(!Objects.equals(user.getId(), comment.getUser().getId())){
            throw new AppException(ErrorCode.UPDATE_COMMENT_INVALID);
        }
        if(request.getContent() == null || request.getContent().isEmpty()){
            throw new AppException(ErrorCode.CONTENT_COMMENT_INVALID);
        }
        if(bannedWordsService.containsBannedWord(request.getContent())){
            throw new AppException(ErrorCode.BANNED_WORD_EXISTED);
        }
        commentMapper.updateComment(request, comment);
        commentRepository.save(comment);
        return UpdateCommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        if(!Objects.equals(user.getId(), comment.getUser().getId())){
            throw new AppException(ErrorCode.DELETE_COMMENT_INVALID);
        }
        commentRepository.delete(comment);
    }
}
