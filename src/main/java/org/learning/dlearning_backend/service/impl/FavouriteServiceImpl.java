package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.FavouriteRequest;
import org.learning.dlearning_backend.dto.response.FavouriteResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.mapper.FavouriteMapper;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.model.Favourite;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.CourseRepository;
import org.learning.dlearning_backend.repository.FavouriteRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.learning.dlearning_backend.service.FavouriteService;
import org.learning.dlearning_backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavouriteServiceImpl implements FavouriteService {
    private final FavouriteRepository favouriteRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final FavouriteMapper favouriteMapper;

    @Override
    @PreAuthorize("isAuthenticated()")
    public void addFavourite(FavouriteRequest request) {

        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Course course = courseRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_EXISTED));

        boolean isAlreadyFavourite = favouriteRepository.existsByUserAndCourse(user, course);
        if (isAlreadyFavourite) {
            throw new AppException(ErrorCode.ALREADY_IN_FAVOURITES);
        }
        Favourite favourite = Favourite.builder()
                .user(user)
                .course(course)
                .build();

        favouriteRepository.save(favourite);
        log.info("User {} added course {} to favourites", user.getEmail(), course.getTitle());
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public PageResponse<FavouriteResponse> getAllFavourites(int page, int size) {
        String email = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_INVALID));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXCITED));

        Page<Favourite> favourites = favouriteRepository.findByUser(user, PageRequest.of(page-1, size));

        return PageResponse.<FavouriteResponse>builder()
                .currentPage(page)
                .totalPages(favourites.getTotalPages())
                .totalElements(favourites.getTotalElements())
                .result(favourites.getContent().stream().map(favouriteMapper::toFavouriteResponse).toList())
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public void deleteFavourite(FavouriteRequest request) {
        Favourite favourite = favouriteRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.FAVOURITE_NOT_EXISTED));
        favouriteRepository.delete(favourite);
    }
}
