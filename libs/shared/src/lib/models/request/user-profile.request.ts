import { CourseLevel } from '../enum/course-level.enum';

export interface UserProfileRequest {
  avatar: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  description: string;
  courseLevel: CourseLevel;
}
