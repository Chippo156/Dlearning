import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PostResponse } from '../models/data/post-response.model';
import { PostContentRequest } from '../models/request/post-content.request';
import { HttpBaseService } from './http-base.service';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PostService extends HttpBaseService {
  createPost(content: string, file?: File | null): Observable<PostResponse> {
    const url = `${this.baseUrl}/posts/create-post`;
    const payload: PostContentRequest = { content };
    const formData = new FormData();

    formData.append(
      'post',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    if (file) {
      formData.append('file', file);
    }

    return this.http
      .post<ApiResponse<PostResponse>>(url, formData)
      .pipe(map((res) => res.data));
  }

  getAllPosts(
    pagination: Pagination
  ): Observable<PaginationResponse<PostResponse>> {
    const qps = `page=${pagination.currentPage}&size=${pagination.pageSize}`;
    const url = `${this.baseUrl}/posts/get-all-post?${qps}`;
    return this.http
      .get<ApiResponse<PaginationResponse<PostResponse>>>(url)
      .pipe(map((res) => res.data));
  }

  getPostsByCurrentUser(
    pagination: Pagination
  ): Observable<PaginationResponse<PostResponse>> {
    const qps = `page=${pagination.currentPage}&size=${pagination.pageSize}`;
    const url = `${this.baseUrl}/posts/get-post-current-login?${qps}`;
    return this.http
      .get<ApiResponse<PaginationResponse<PostResponse>>>(url)
      .pipe(map((res) => res.data));
  }

  updatePost(
    postId: number,
    content: string,
    image?: File | null
  ): Observable<PostResponse> {
    const url = `${this.baseUrl}/posts/update-post/${postId}`;
    const payload: PostContentRequest = { content };
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    if (image) {
      formData.append('image', image);
    }

    return this.http
      .put<ApiResponse<PostResponse>>(url, formData)
      .pipe(map((res) => res.data));
  }

  deletePost(postId: number): Observable<void> {
    const url = `${this.baseUrl}/posts/delete-post/${postId}`;
    return this.http.delete<ApiResponse<void>>(url).pipe(map(() => undefined));
  }
}
