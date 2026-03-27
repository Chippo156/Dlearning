import { finalize } from 'rxjs';
import { CourseService } from '@shared/services/course.service';
import { LessonProgressService } from '@shared/services/lesson-progress.service';
import { LearningPageLogicImplement } from './learning-page-logic.implement';

export abstract class LearningPageLogic extends LearningPageLogicImplement {
  constructor(
    private courseService: CourseService,
    private lessonProgressService: LessonProgressService
  ) {
    super();
  }

  getCourseDetail(courseId: number) {
    return this.courseService
      .getChapterById(courseId)
      .pipe(finalize(() => this.getCourseDetailComplete()))
      .subscribe({
        next: (res) => this.getCourseDetailSuccess(res),
        error: (error) => this.getCourseDetailFailed(error),
      });
  }

  getCompletion(courseId: number) {
    return this.lessonProgressService
      .getCompletionPercentage(courseId)
      .pipe(finalize(() => this.getCompletionComplete()))
      .subscribe({
        next: (res) => this.getCompletionSuccess(res),
        error: (error) => this.getCompletionFailed(error),
      });
  }

  completeLesson(lessonId: number) {
    return this.lessonProgressService
      .markLessonAsCompleted(lessonId)
      .pipe(finalize(() => this.completeLessonComplete()))
      .subscribe({
        next: (res) => this.completeLessonSuccess(res),
        error: (error) => this.completeLessonFailed(error),
      });
  }
}
