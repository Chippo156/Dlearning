package org.learning.dlearning_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.FavouriteRequest;
import org.learning.dlearning_backend.dto.response.FavouriteResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.dto.response.ResponseData;
import org.learning.dlearning_backend.service.FavouriteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/favourite")
public class FavouriteController {
    private final FavouriteService favouriteService;

    @PostMapping("/create-favourite")
    public ResponseData<Void> createFavourite(@RequestBody FavouriteRequest favouriteRequest) {
        favouriteService.addFavourite(favouriteRequest);
        return ResponseData.<Void>builder()
                .code(200)
                .message("OK")
                .build();
    }

    @GetMapping("/get-all-favourites")
    public ResponseData<PageResponse<FavouriteResponse>> getAllFavourites(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseData.<PageResponse<FavouriteResponse>>builder()
                .code(200)
                .message("OK")
                .data(favouriteService.getAllFavourites(page, size))
                .build();
    }
    @PostMapping("/delete-favourite")
    public ResponseData<Void> deleteFavourite(@RequestBody FavouriteRequest favouriteRequest) {
        favouriteService.deleteFavourite(favouriteRequest);
        return ResponseData.<Void>builder()
                .code(200)
                .message("OK")
                .build();
    }

}
