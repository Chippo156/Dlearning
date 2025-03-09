package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.response.FavouriteResponse;
import org.learning.dlearning_backend.model.Favourite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavouriteMapper {

    @Mapping(target = "favoriteId", source = "id")
    @Mapping(target = "name", source = "user.fullName")
    @Mapping(target = "author", source = "course.author.fullName")
    @Mapping(target = "title", source = "course.title")
    @Mapping(target = "thumbnail", source = "course.thumbnail")
    @Mapping(target = "points", source = "course.points")
    @Mapping(target = "id", source = "course.id")
    @Mapping(target = "averageRating", ignore = true)
    @Mapping(target = "description", source = "course.description")
    @Mapping(target = "duration", source = "course.duration")
    @Mapping(target = "language", source = "course.language")
    @Mapping(target = "courseLevel", source = "course.courseLevel")
    FavouriteResponse toFavouriteResponse(Favourite favourite);
}
