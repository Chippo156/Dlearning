import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { TeacherRegistrationResponse } from '../models/data/teacher-registration-response.model';
import { TeacherRegistrationRequest } from '../models/request/teacher-registration.request';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherRegistrationService extends HttpBaseService {
  registerTeacher(
    request: TeacherRegistrationRequest,
    cvFile: File,
    certificateFile: File
  ): Observable<TeacherRegistrationResponse> {
    const url = `${this.baseUrl}/register-teacher`;
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );
    formData.append('cv', cvFile);
    formData.append('certificate', certificateFile);

    return this.http
      .post<ApiResponse<TeacherRegistrationResponse>>(url, formData)
      .pipe(map((res) => res.data));
  }
}
