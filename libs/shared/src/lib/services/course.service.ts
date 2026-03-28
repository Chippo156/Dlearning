import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import {
  Pagination,
  PaginationResponse,
} from '../models/request/pagination.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { CourseResponse } from '../models/course-response.model';
import { CourseChapter } from '@shared/models/data/course-chapter.model';
import { CourseCreationRequest } from '@shared/models/request/course-creation.request';
import { CourseDropdownItem } from '@shared/models/course-dropdown-item.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends HttpBaseService {
  private toCourseFormData(
    request: CourseCreationRequest,
    file?: File | null,
    video?: File | null
  ): FormData {
    const formData = new FormData();
    formData.append(
      'course',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );

    if (file) {
      formData.append('file', file);
    }
    if (video) {
      formData.append('video', video);
    }

    return formData;
  }

  getCoursesCaching(
    Pagination: Pagination
  ): Observable<ApiResponse<PaginationResponse<CourseResponse>>> {
    const qps = `page=${Pagination.currentPage}&size=${Pagination.pageSize}`;
    const url = `${this.baseUrl}/courses/get-courses-caching?${qps}`;
    return this.http.get<ApiResponse<PaginationResponse<CourseResponse>>>(url);
  }

  getCoursesElasticSearch(
    Pagination: Pagination,
    keyword: string
  ): Observable<ApiResponse<PaginationResponse<CourseResponse>>> {
    const qps = `page=${Pagination.currentPage}&size=${Pagination.pageSize}&keyword=${keyword}`;
    const url = `${this.baseUrl}/courses/get-course-elastic-search?${qps}`;
    return this.http.get<ApiResponse<PaginationResponse<CourseResponse>>>(url);
  }

  getCourseDetailById(id: number): Observable<ApiResponse<CourseResponse>> {
    const url = `${this.baseUrl}/courses/${id}`;
    return this.http.get<ApiResponse<CourseResponse>>(url);
  }

  getChapterById(courseId: number): Observable<CourseChapter> {
    const url = `${this.baseUrl}/courses/get-info-course/${courseId}`;
    return this.http
      .get<ApiResponse<CourseChapter>>(url)
      .pipe(map((response) => response.data));
  }

  buyCourse(id: number): Observable<ApiResponse<any>> {
    const request = {
      courseId: id,
    };
    const url = `${this.baseUrl}/courses/buy-course`;
    return this.http.post<ApiResponse<any>>(url, request);
  }

  checkPurchase(courseId: number): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/enrollments/check-course-purchased/${courseId}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  createCourse(
    request: CourseCreationRequest,
    file?: File | null,
    video?: File | null
  ): Observable<ApiResponse<CourseResponse>> {
    const url = `${this.baseUrl}/courses/create-course`;
    return this.http.post<ApiResponse<CourseResponse>>(
      url,
      this.toCourseFormData(request, file, video)
    );
  }

  updateCourse(
    id: number,
    request: CourseCreationRequest,
    file?: File | null,
    video?: File | null
  ): Observable<ApiResponse<CourseResponse>> {
    const url = `${this.baseUrl}/courses/update-course/${id}`;
    return this.http.put<ApiResponse<CourseResponse>>(
      url,
      this.toCourseFormData(request, file, video)
    );
  }

  deleteCourse(id: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/courses/delete-course/${id}`;
    return this.http.delete<ApiResponse<void>>(url);
  }

  getCoursesForDropdown(): Observable<CourseDropdownItem[]> {
    const url = `${this.baseUrl}/courses/get-courses-for-dropdown`;
    return this.http
      .get<ApiResponse<CourseDropdownItem[]>>(url)
      .pipe(map((res) => res.data || []));
  }
}
