package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.UserProfileRequest;
import org.learning.dlearning_backend.dto.response.UserProfileResponse;
import org.learning.dlearning_backend.model.User;

public interface ProfileService {
    void updateProfile(UserProfileRequest userProfileRequest);

    UserProfileResponse getInfoUser();
}
