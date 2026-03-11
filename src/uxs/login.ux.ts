import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginLogic } from '../logics/login-logic/login.logic';
import { ApiResponse } from '../models/api-response.model';
import { LoginResponse } from '../models/data/login-response.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/request/login-request.model';

@Component({
  selector: 'app-login-ux',
  template: '',
  standalone: true,
})
export class LoginUx extends LoginLogic implements OnDestroy {
  @Output() loginSuccessEvent = new EventEmitter<ApiResponse<LoginResponse>>();

  loading: boolean = false;
  error: any;

  private data!: Subscription;
  constructor(
    authService: AuthService,
    private notification: NzNotificationService,
  ) {
    super(authService);
  }

  override login(req: LoginRequest): Subscription {
    this.loading = true;

    this.data = super.login(req);
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }
  override loginSuccess(res: ApiResponse<LoginResponse>): void {
    this.loading = false;

    this.notification.success(
      'Login Successful',
      'Welcome back! You have successfully logged in.',
    );
    this.loginSuccessEvent.emit(res);
  }

  override loginFailed(error: any): void {
    this.loading = false;
    this.error = error;
  }

  override loginComplete(): void {
    this.loading = false;
  }
}
