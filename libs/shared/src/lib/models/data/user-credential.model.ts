import { UserProfile } from './user-profile.model';

export interface UserCredentials {
  valid: boolean;
  scopes: string;
  userProfile: UserProfile;
}
