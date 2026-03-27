import { Injectable } from '@angular/core';
import { FavouriteRequest } from '@shared/models/request/favourite-request.model';
import { HttpBaseService } from './http-base.service';
import { map, Observable } from 'rxjs';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';
import { FavouriteResponse } from '@shared/models/data/favourite-response.model';
import { ApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService extends HttpBaseService {
  readonly entityUrl = 'favourite';

  /**
   * Get all favourite courses of the user with pagination.
   * @param pagination
   * @returns
   */
  getAllFavourite(
    pagination: Pagination
  ): Observable<PaginationResponse<FavouriteResponse>> {
    return this.http
      .get<ApiResponse<PaginationResponse<FavouriteResponse>>>(
        `${this.baseUrl}/${this.entityUrl}/get-all-favourites?page=${pagination.currentPage}&size=${pagination.pageSize}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  /**
   * Add a course to the user's favourites.
   * @param req - The request object containing the course ID to be added to favourites.
   * @returns An Observable of the API response.
   */
  createFavourite(req: FavouriteRequest) {
    return this.http.post(
      `${this.baseUrl}/${this.entityUrl}/create-favourite`,
      req
    );
  }

  /**
   * Remove a course from the user's favourites.
   * @param req - The request object containing the course ID to be removed from favourites.
   * @returns An Observable of the API response.
   */
  deleteFavourite(req: FavouriteRequest) {
    return this.http.post(
      `${this.baseUrl}/${this.entityUrl}/delete-favourite`,
      req
    );
  }
}
