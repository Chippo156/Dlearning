import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request.model';
import { LoginResponse } from '../models/data/login-response.model';
import { AuthStore } from './auth-store.service';
import { HttpBaseService } from './http-base.service';
import { ApiResponse } from '../models/api-response.model';
import { RegisterRequest } from '../models/request/register-request.model';
import { UserRegisterResponse } from '../models/data/user-register-response.model';
import { UserCredentials } from '../models/data/user-credential.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  isLogin$ = new BehaviorSubject<boolean>(this.isLogin);

  constructor(
    http: HttpClient,
    injector: Injector,
    protected authStore: AuthStore,
  ) {
    super(http, injector);
  }

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    const url = `${this.baseUrl}/auth/sign-in`;
    return this.http.post<ApiResponse<LoginResponse>>(url, request).pipe(
      tap(this.saveCredentials),
      tap(() => this.isLogin$.next(true)),
    );
  }

  register(
    request: RegisterRequest,
    otp: string,
  ): Observable<ApiResponse<UserRegisterResponse>> {
    const url = `${this.baseUrl}/user/create-user?` + `otp=${otp}`;
    return this.http.post<ApiResponse<UserRegisterResponse>>(url, request);
  }

  checkUserExists(email: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/user/check-exist-user?` + `email=${email}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  sendOtp(email: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/user/send-otp-register`;
    return this.http.post<ApiResponse<any>>(url, { email });
  }

  verifyOtp(email: string, otp: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/user/verify-otp`;
    return this.http.post<ApiResponse<any>>(url, { email, otp });
  }

  introspect(token: string) {
    const url = `${this.baseUrl}/auth/introspect`;
    return this.http.post<ApiResponse<UserCredentials>>(url, { token });
  }

  saveUserProfile(userProfile: UserCredentials): void {
    const res: UserCredentials = {
      valid: userProfile.valid,
      scopes: userProfile.scopes,
      userProfile: userProfile.userProfile,
    };
    window.localStorage.setItem('userProfile', JSON.stringify(res));
  }

  logout(token: string): void {
    const url = `${this.baseUrl}/auth/logout`;
    this.http.post(url, { token }).subscribe(() => {
      this.isLogin$.next(false);
    });
  }

  get credentials(): LoginResponse {
    return this.authStore.credentials;
  }

  get isLogin(): boolean {
    return !!this.credentials && this.credentials.token != null;
  }

  protected saveCredentials = (res: ApiResponse<LoginResponse>) => {
    const credentials: LoginResponse = {
      authenticated: res.data.authenticated,
      role: res.data.role,
      token: res.data.token,
    };

    this.authStore.credentials = credentials;
  };
}
