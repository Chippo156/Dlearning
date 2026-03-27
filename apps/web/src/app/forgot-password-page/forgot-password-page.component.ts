import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, finalize, switchMap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.less',
})
export class ForgotPasswordPageComponent {
  loading = false;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  onForgotPassword(email: string) {
    this.loading = true;

    this.authService
      .checkUserExists(email)
      .pipe(
        switchMap((res) => {
          if (!res.data) {
            this.notification.warning(
              'Email not found',
              'This email is not registered in our system.'
            );
            return EMPTY;
          }

          return this.authService.sendOtp(email);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this.notification.success(
            'Recovery code sent',
            'Please check your email for the password recovery code.'
          );
          this.router.navigate(['/login']);
        },
        error: () => {
          this.notification.error(
            'Request failed',
            'Unable to process forgot password at this time. Please try again.'
          );
        },
      });
  }
}
