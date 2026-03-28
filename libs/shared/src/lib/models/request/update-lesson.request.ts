export interface UpdateLessonRequest {
  courseId: number;
  chapterId: number;
  lessonId: number;
  lessonName: string;
  description: string;
}
