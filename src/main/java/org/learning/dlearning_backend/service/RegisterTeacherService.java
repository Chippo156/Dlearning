package org.learning.dlearning_backend.service;


import org.learning.dlearning_backend.dto.request.UserRegisterTeacherRequest;
import org.learning.dlearning_backend.dto.response.UserRegisterTeacherResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

public interface RegisterTeacherService {
    List<UserRegisterTeacherResponse> getAllRegisterTeacher();
    UserRegisterTeacherResponse registerTeacher(UserRegisterTeacherRequest request, MultipartFile cv, MultipartFile certificate) throws IOException, URISyntaxException;

    UserRegisterTeacherResponse saveTeacher(Long id);
    UserRegisterTeacherResponse rejectTeacher(Long id);
}
