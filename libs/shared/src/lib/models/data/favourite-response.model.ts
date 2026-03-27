import { CourseLevel, TypeCourse } from '../enum/course-level.enum';

export interface FavouriteResponse {
  favouriteId: number;
  id: number;
  name: string;
  author: string;
  title: string;
  description: string;
  duration: number;
  language: string;
  typeCourse: TypeCourse;
  courseLevel: CourseLevel;
  thumbnail: string;
  averageRating: number;
  points: number;
}
