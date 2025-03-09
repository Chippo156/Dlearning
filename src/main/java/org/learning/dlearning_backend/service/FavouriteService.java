package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.FavouriteRequest;
import org.learning.dlearning_backend.dto.response.FavouriteResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;

public interface FavouriteService {
    void addFavourite(FavouriteRequest request);
    PageResponse<FavouriteResponse> getAllFavourites(int page, int size);
    void deleteFavourite(FavouriteRequest request);
}
