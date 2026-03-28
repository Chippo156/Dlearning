import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response.model';
import { LessonCreationResponse } from '@shared/models/lesson-creation-response.model';
import { LessonCreationRequest } from '@shared/models/request/lesson-creation.request';
import { UpdateLessonRequest } from '@shared/models/request/update-lesson.request';
import { UpdateLessonResponse } from '@shared/models/update-lesson-response.model';
import { HttpBaseService } from './http-base.service';
import { PaginationResponse } from '@shared/models/request/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService extends HttpBaseService {
  private toLessonFormData(
    request: LessonCreationRequest | UpdateLessonRequest,
    file?: File | null
  ): FormData {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );

    if (file) {
      formData.append('video', file);
    }

    return formData;
  }

  createLesson(
    request: LessonCreationRequest,
    file?: File | null
  ): Observable<ApiResponse<LessonCreationResponse>> {
    const url = `${this.baseUrl}/lessons/create-lesson`;
    return this.http.post<ApiResponse<LessonCreationResponse>>(
      url,
      this.toLessonFormData(request, file)
    );
  }

  updateLesson(
    request: UpdateLessonRequest,
    file?: File | null
  ): Observable<ApiResponse<UpdateLessonResponse>> {
    const url = `${this.baseUrl}/lessons/update-lesson`;
    return this.http.post<ApiResponse<UpdateLessonResponse>>(
      url,
      this.toLessonFormData(request, file)
    );
  }

  deleteLesson(lessonId: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/lessons/delete-lesson/${lessonId}`;
    return this.http.delete<ApiResponse<void>>(url);
  }

  getAllLessons(): Observable<PaginationResponse<LessonCreationResponse>> {
    const url = `${this.baseUrl}/lessons/get-all-lessons`;
    return this.http
      .get<ApiResponse<PaginationResponse<LessonCreationResponse>>>(url)
      .pipe(
        map(
          (res) =>
            res.data || {
              result: [],
              totalElements: 0,
              totalPages: 0,
              currentPage: 1,
              pageSize: 10,
            }
        )
      );
  }
}
