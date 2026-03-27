export interface CourseChapter {
  courseId: number;
  courseTitle: string;
  totalLessons: number;
  courseDescription: string;
  chapters: ChapterResponse[];
}

export interface ChapterResponse {
  chapterId: number;
  chapterName: string;
  lessonDto: LessonResponse[];
}

export interface LessonResponse {
  lessonId: number;
  lessonName: string;
  description: string;
  videoUrl: string;
}
