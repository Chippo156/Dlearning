package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.UserCreationRequest;
import org.learning.dlearning_backend.dto.response.UserResponse;

public interface UserService {


    UserResponse createUser(UserCreationRequest request);

}
