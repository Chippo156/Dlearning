import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { map, Observable } from 'rxjs';
import {
  Pagination,
  PaginationResponse,
} from '@models/request/pagination.model';
import { AdsCreationResponse } from '@models/data/ads-createtion-response.model';
import { ApiResponse } from '@models/api-response.model';
import { AdsActiveResponse } from '@models/data/ads-active-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService extends HttpBaseService {
  getAdsCurrentLogin(
    pagination: Pagination,
  ): Observable<PaginationResponse<AdsCreationResponse>> {
    const qps = `?page=${pagination.currentPage}&size=${pagination.pageSize}`;
    const url = `${this.baseUrl}/advertisement/get-ads` + qps;
    return this.http
      .get<
        ApiResponse<PaginationResponse<AdsCreationResponse>>
      >(`${this.baseUrl}/advertisement/get-ads` + qps)
      .pipe(map((res) => res.data));
  }

  getAdsActive(): Observable<AdsActiveResponse[]> {
    const url = `${this.baseUrl}/advertisement/get-ads-active`;
    return this.http
      .get<ApiResponse<AdsActiveResponse[]>>(url)
      .pipe(map((res) => res.data));
  }
}
