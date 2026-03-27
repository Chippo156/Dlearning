import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { RegisterLogic } from '../../../logics/src/lib/register-logic/register.logic';
import { Subscription } from 'rxjs';
import { RegisterRequest } from '@shared/models/request/register-request.model';
import { AuthService } from '@shared/services/auth.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { UserRegisterResponse } from '@shared/models/data/user-register-response.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register-ux',
  template: '',
  standalone: true,
})
export class RegisterUx extends RegisterLogic implements OnDestroy {
  @Output() registerSuccessEvent = new EventEmitter<
    ApiResponse<UserRegisterResponse>
  >();

  loading: boolean = false;
  error: any;

  private data!: Subscription;
  constructor(
    authService: AuthService,
    private notification: NzNotificationService
  ) {
    super(authService);
  }

  override register(req: RegisterRequest, otp: string): Subscription {
    this.loading = true;

    this.data = super.register(req, otp);
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }
  override registerSuccess(res: ApiResponse<UserRegisterResponse>): void {
    this.loading = false;

    this.notification.success(
      'Registration Successful',
      'You can now log in with your credentials.'
    );
    this.registerSuccessEvent.emit(res);
  }

  override registerFailed(error: any): void {
    this.loading = false;
    this.error = error;
  }

  override registerComplete(): void {
    this.loading = false;
  }
}
