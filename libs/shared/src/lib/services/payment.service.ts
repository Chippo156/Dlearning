import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { map, Observable } from 'rxjs';
import { VnPayResponse } from '@shared/models/data/vn-pay-response.model';
import { ApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends HttpBaseService {
  goVnpay(amount: number): Observable<VnPayResponse> {
    const url = `${this.baseUrl}/payment/vn-pay?amount=${amount}&bankCode=NCB`;
    return this.http
      .get<ApiResponse<VnPayResponse>>(url)
      .pipe(map((response) => response.data));
  }
}
