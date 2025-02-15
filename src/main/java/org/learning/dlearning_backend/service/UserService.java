package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.response.UserResponse;
import org.learning.dlearning_backend.model.User;

import java.util.Optional;

public interface UserService {


    UserResponse createUser(UserCreationRequest request);
    UserResponse findByUsername(String username);

}
