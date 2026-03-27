import { UserProfileRequest } from '@shared/models/request/user-profile.request';
import { HttpBaseService } from './http-base.service';
import { Injectable } from '@angular/core';
import { UserProfile } from '@shared/models/data/user-profile.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { map, Observable } from 'rxjs';
import { PointsCurrent } from '@shared/models/data/points-current.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends HttpBaseService {
  readonly entityUrl = 'profile';

  /**
   * Updates the user's profile information.
   * @param profileData The updated profile data.
   * @returns A promise resolving to the updated profile.
   */
  updateProfile(profileData: UserProfileRequest) {
    return this.http.put(
      `${this.baseUrl}/${this.entityUrl}/update-profile`,
      profileData
    );
  }

  getProfile() {
    return this.http
      .get<ApiResponse<UserProfile>>(
        `${this.baseUrl}/${this.entityUrl}/get-info`
      )
      .pipe(map((response) => response.data));
  }
}
