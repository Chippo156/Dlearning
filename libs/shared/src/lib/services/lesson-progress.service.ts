import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { map, Observable } from 'rxjs';
import { LessonProgessResponse } from '@shared/models/data/lesson-progress-response.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { UserCompletionLesson } from '@shared/models/data/user-completion-lessson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonProgressService extends HttpBaseService {
  readonly entityUrl: string = 'lesson-progress';

  markLessonAsCompleted(lessonId: number): Observable<LessonProgessResponse> {
    return this.http
      .post<ApiResponse<LessonProgessResponse>>(
        `${this.baseUrl}/${this.entityUrl}/mark-lesson-as-complete`,
        { lessonId }
      )
      .pipe(map((res) => res.data));
  }

  getCompletionPercentage(courseId: number): Observable<UserCompletionLesson> {
    return this.http
      .get<ApiResponse<UserCompletionLesson>>(
        `${this.baseUrl}/${this.entityUrl}/calculate-completion/${courseId}`
      )
      .pipe(map((res) => res.data));
  }
}
