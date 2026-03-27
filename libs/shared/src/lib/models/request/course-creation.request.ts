import { CourseLevel } from '../enum/course-level.enum';

export interface CourseCreationRequest {
  title: string;
  description: string;
  duration: number;
  language: string;
  courseLevel: CourseLevel;
  points: number;
}
