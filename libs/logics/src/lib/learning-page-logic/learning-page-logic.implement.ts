import { CourseChapter } from '@shared/models/data/course-chapter.model';
import { LessonProgessResponse } from '@shared/models/data/lesson-progress-response.model';
import { UserCompletionLesson } from '@shared/models/data/user-completion-lessson.model';

export abstract class LearningPageLogicImplement {
  abstract getCourseDetailSuccess(res: CourseChapter): void;
  abstract getCourseDetailFailed(error: any): void;
  abstract getCourseDetailComplete(): void;

  abstract getCompletionSuccess(res: UserCompletionLesson): void;
  abstract getCompletionFailed(error: any): void;
  abstract getCompletionComplete(): void;

  abstract completeLessonSuccess(res: LessonProgessResponse): void;
  abstract completeLessonFailed(error: any): void;
  abstract completeLessonComplete(): void;
}
