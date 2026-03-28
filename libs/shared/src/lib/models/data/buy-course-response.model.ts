import { CourseLevel } from '../enum/course-level.enum';

export interface BuyCourseResponse {
  courseId: number;
  title: string;
  author: string;
  thumbnail: string;
  courseLevel: CourseLevel;
  points: number;
  createdAt: string; // "yyyy-MM-dd HH:mm:ss"
}
