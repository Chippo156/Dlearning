export interface UserCompletionLesson {
  totalLessonComplete: number;
  totalLessons: number;
  completionPercentage: number;
  lessonCompletes: LessonCompletionResponse[];
}

export interface LessonCompletionResponse {
  lessonId: number;
  lessonName: string;
}
