package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.request.CommentRequest;
import org.learning.dlearning_backend.dto.request.UpdateCommentRequest;
import org.learning.dlearning_backend.dto.response.CommentResponse;
import org.learning.dlearning_backend.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment toComment(CommentRequest request);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "postId", source = "post.id")
    @Mapping(target = "name", source = "user.fullName")
    @Mapping(target = "avatar", source = "user.avatar")
    @Mapping(target = "replies", source = "replies")
    CommentResponse toCommentResponse(Comment comment);

    void updateComment(UpdateCommentRequest request, @MappingTarget Comment comment);
}
