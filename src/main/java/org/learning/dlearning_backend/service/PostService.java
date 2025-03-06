package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.PostCreationRequest;
import org.learning.dlearning_backend.dto.request.UpdatePostRequest;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.PostCreationResponse;
import org.learning.dlearning_backend.dto.response.PostResponse;
import org.learning.dlearning_backend.dto.response.UpdatePostResponse;
import org.learning.dlearning_backend.model.Post;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    PostCreationResponse createPost(PostCreationRequest request, MultipartFile file);
    PageResponse<PostResponse> getAllPost(Specification<Post> spec, int page, int size);
    PageResponse<PostResponse> getPostCurrentLogin(Specification<Post> spec , int page, int size);
    void deletePost(Long postId);

   UpdatePostResponse updatePost(Long postId, UpdatePostRequest request, MultipartFile file);


}
