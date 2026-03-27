import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { CertificateCreateRequest } from '@shared/models/request/certificate-create.request';
import { map, Observable } from 'rxjs';
import { CertificateResponse } from '@shared/models/data/certificate-response.model';
import { ApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateService extends HttpBaseService {
  readonly entityUrl = 'certificate';

  /**
   * Create a certificate for the current user.
   * @param courseId - The ID of the course for which to create the certificate.
   * @return An Observable of the API response.
   */

  createCertificate(req: CertificateCreateRequest) {
    return this.http.post(
      `${this.baseUrl}/${this.entityUrl}/create-certificate`,
      req
    );
  }

  /**
   * Get all certificates of the current user.
   * @return An Observable of the API response containing the list of certificates.
   */
  getAllCertificatesForCurrentUser(): Observable<CertificateResponse[]> {
    return this.http
      .get<ApiResponse<CertificateResponse[]>>(
        `${this.baseUrl}/${this.entityUrl}/current-login`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
