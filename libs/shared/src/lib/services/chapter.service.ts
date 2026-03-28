import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response.model';
import { ChapterResponse } from '@shared/models/chapter-response.model';
import { CourseDropdownItem } from '@shared/models/course-dropdown-item.model';
import { ChapterCreationRequest } from '@shared/models/request/chapter-creation.request';
import { ChapterUpdateRequest } from '@shared/models/request/chapter-update.request';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class ChapterService extends HttpBaseService {
  getChaptersByCourse(courseId: number): Observable<ChapterResponse[]> {
    const url = `${this.baseUrl}/chapter/get-chapters-by-course/${courseId}`;
    return this.http
      .get<ApiResponse<ChapterResponse[]>>(url)
      .pipe(map((res) => res.data || []));
  }

  createChapter(
    request: ChapterCreationRequest
  ): Observable<ApiResponse<ChapterResponse>> {
    const url = `${this.baseUrl}/chapter/create`;
    return this.http.post<ApiResponse<ChapterResponse>>(url, request);
  }

  updateChapter(
    chapterId: number,
    request: ChapterUpdateRequest
  ): Observable<ApiResponse<ChapterResponse>> {
    const url = `${this.baseUrl}/chapter/update/${chapterId}`;
    return this.http.put<ApiResponse<ChapterResponse>>(url, request);
  }

  deleteChapter(chapterId: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/chapter/delete/${chapterId}`;
    return this.http.delete<ApiResponse<void>>(url);
  }
}
