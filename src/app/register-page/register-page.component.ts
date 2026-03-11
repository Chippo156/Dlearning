import { Component } from '@angular/core';
import { LoginRequest } from '../../models/request/login-request.model';
import { AuthService } from '../../services/auth.service';
import { EMPTY, finalize, switchMap } from 'rxjs';
import { RegisterRequest } from '../../models/request/register-request.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.less',
})
export class RegisterPageComponent {
  loading = false;
  isOtpSent = false;

  formValue!: RegisterRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService,
  ) {}

  formSubmit(value: RegisterRequest) {
    const email = value.email;
    this.formValue = value;

    this.loading = true;

    this.authService
      .checkUserExists(email)
      .pipe(
        switchMap((checkUserExist) => {
          if (checkUserExist.data) {
            this.notification.warning(
              'Email Exists',
              'This email is already registered.',
            );
            return EMPTY;
          }

          return this.authService.sendOtp(email);
        }),

        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: () => {
          this.isOtpSent = true;
          this.notification.success(
            'OTP Sent',
            'Please check your email for OTP code.',
          );
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  onRegisterSuccess() {
    this.router.navigate(['/login']);
  }
}
