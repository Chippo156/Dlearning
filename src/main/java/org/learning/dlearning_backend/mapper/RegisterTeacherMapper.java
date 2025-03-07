package org.learning.dlearning_backend.mapper;

import org.learning.dlearning_backend.dto.request.UserRegisterTeacherRequest;
import org.learning.dlearning_backend.dto.response.UserRegisterTeacherResponse;
import org.learning.dlearning_backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RegisterTeacherMapper {



    void toUpdateTeacher(UserRegisterTeacherRequest request, @MappingTarget User user);

    UserRegisterTeacherResponse toTeacherResponse(User user);
}
