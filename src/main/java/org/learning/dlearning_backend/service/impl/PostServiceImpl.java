package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.PostCreationRequest;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.PostCreationResponse;
import org.learning.dlearning_backend.dto.response.PostResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.PostMapper;
import org.learning.dlearning_backend.model.Post;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.PostRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.PostService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final PostMapper postMapper;

    @Override
    @PreAuthorize("isAuthenticated()")
    public PostCreationResponse createPost(PostCreationRequest request, MultipartFile file) {

        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        if (file != null) {
            String image = cloudinaryService.uploadImage(file);
            request.setImage(image);
        }
        Post post = postMapper.toPost(request);
        post.setUser(user);
        postRepository.save(post);
        return postMapper.toPostCreationResponse(post);

    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public PageResponse<PostResponse> getAllPost(Specification<Post> spec, int page, int size) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page-1, size, sort);

        Page<Post> posts = postRepository.findAll(spec, pageable);

        List<PostResponse> postResponses = posts.getContent().stream().map(postMapper::toPostResponse).toList();

        for (int i = 0; i < postResponses.size(); i++) {
            Post post = posts.getContent().get(i);
            PostResponse postResponse = postResponses.get(i);
            postResponse.setOwner(Objects.equals(user.getId(), post.getUser().getId()));
        }
        return PageResponse.<PostResponse>builder()
                .totalPages(posts.getTotalPages())
                .totalElements(posts.getTotalElements())
                .pageSize(pageable.getPageSize())
                .currentPage(page)
                .result(postResponses)
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public PageResponse<PostResponse> getPostCurrentLogin(Specification<Post> spec, int page, int size) {

        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page-1, size, sort);

        Specification<Post> userSpec = ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user));
        Specification<Post> combinedSpec = spec != null ? userSpec.and(spec) : userSpec;

        Page<Post> posts = postRepository.findAll(combinedSpec, pageable);

        List<PostResponse> postResponses = posts.getContent().stream().map(postMapper::toPostResponse).toList();
        for (int i = 0; i < postResponses.size(); i++) {
            Post post = posts.getContent().get(i);
            PostResponse postResponse = postResponses.get(i);
            postResponse.setOwner(Objects.equals(user.getId(), post.getUser().getId()));
        }
        return PageResponse.<PostResponse>builder()
                .totalPages(posts.getTotalPages())
                .totalElements(posts.getTotalElements())
                .pageSize(pageable.getPageSize())
                .currentPage(page)
                .result(postResponses)
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public void deletePost(Long postId) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        if (!Objects.equals(user.getId(), post.getUser().getId())) {
            throw new AppException(ErrorCode.USER_NOT_EXCITED);
        }
        postRepository.delete(post);
    }
}
