import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseChapter } from '@shared/models/data/course-chapter.model';
import { LessonProgessResponse } from '@shared/models/data/lesson-progress-response.model';
import { UserCompletionLesson } from '@shared/models/data/user-completion-lessson.model';
import { CourseService } from '@shared/services/course.service';
import { LessonProgressService } from '@shared/services/lesson-progress.service';
import { LearningPageLogic } from '@logics/learning-page-logic/learning-page.logic';

@Component({
  selector: 'app-learning-page-ux',
  template: '',
  standalone: true,
})
export class LearningPageUx extends LearningPageLogic implements OnDestroy {
  @Output() courseLoaded = new EventEmitter<CourseChapter>();
  @Output() courseFailed = new EventEmitter<any>();
  @Output() completionLoaded = new EventEmitter<UserCompletionLesson>();
  @Output() completionFailed = new EventEmitter<any>();
  @Output() lessonCompleted = new EventEmitter<LessonProgessResponse>();
  @Output() lessonCompleteFailed = new EventEmitter<any>();

  loadingCourse = false;
  loadingCompletion = false;
  loadingCompleteLesson = false;
  error: any;

  private courseSub?: Subscription;
  private completionSub?: Subscription;
  private completeLessonSub?: Subscription;

  constructor(
    courseService: CourseService,
    lessonProgressService: LessonProgressService
  ) {
    super(courseService, lessonProgressService);
  }

  override getCourseDetail(courseId: number): Subscription {
    this.loadingCourse = true;
    this.courseSub?.unsubscribe();
    this.courseSub = super.getCourseDetail(courseId);
    return this.courseSub;
  }

  override getCompletion(courseId: number): Subscription {
    this.loadingCompletion = true;
    this.completionSub?.unsubscribe();
    this.completionSub = super.getCompletion(courseId);
    return this.completionSub;
  }

  override completeLesson(lessonId: number): Subscription {
    this.loadingCompleteLesson = true;
    this.completeLessonSub?.unsubscribe();
    this.completeLessonSub = super.completeLesson(lessonId);
    return this.completeLessonSub;
  }

  override getCourseDetailSuccess(res: CourseChapter): void {
    this.courseLoaded.emit(res);
  }

  override getCourseDetailFailed(error: any): void {
    this.error = error;
    this.courseFailed.emit(error);
  }

  override getCourseDetailComplete(): void {
    this.loadingCourse = false;
  }

  override getCompletionSuccess(res: UserCompletionLesson): void {
    this.completionLoaded.emit(res);
  }

  override getCompletionFailed(error: any): void {
    this.error = error;
    this.completionFailed.emit(error);
  }

  override getCompletionComplete(): void {
    this.loadingCompletion = false;
  }

  override completeLessonSuccess(res: LessonProgessResponse): void {
    this.lessonCompleted.emit(res);
  }

  override completeLessonFailed(error: any): void {
    this.error = error;
    this.lessonCompleteFailed.emit(error);
  }

  override completeLessonComplete(): void {
    this.loadingCompleteLesson = false;
  }

  ngOnDestroy(): void {
    this.courseSub?.unsubscribe();
    this.completionSub?.unsubscribe();
    this.completeLessonSub?.unsubscribe();
  }
}
