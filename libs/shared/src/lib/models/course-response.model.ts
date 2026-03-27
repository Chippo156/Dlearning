import { CourseLevel, TypeCourse } from "./enum/course-level.enum";

export interface CourseResponse {
  id: number;
  author: string;
  title: string;
  description: string;
  duration: number;
  language: string;
  courseLevel: CourseLevel;
  typeCourse: TypeCourse;
  thumbnail: string;
  videoUrl: string;
  averageRating: number;
  points: number;
  createdAt: string; // "yyyy-MM-dd HH:mm:ss"
}
