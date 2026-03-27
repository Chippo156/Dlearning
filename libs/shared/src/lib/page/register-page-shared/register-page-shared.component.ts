import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { EMPTY, finalize, switchMap } from 'rxjs';
import { RegisterRequest } from '@shared/models/request/register-request.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { RegisterFormModule } from '@shared/form/register-form/register-form.module';
import { OtpComponent } from '@shared/form/otp-form/otp-form.component';
import { RegisterUx } from '@uxs/register.ux';

@Component({
  selector: 'app-register-page-shared',
  templateUrl: './register-page-shared.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RegisterFormModule,
    OtpComponent,
    RegisterUx,
  ],
})
export class RegisterPageSharedComponent {
  loading = false;
  isOtpSent = false;

  formValue!: RegisterRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
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
              'This email is already registered.'
            );
            return EMPTY;
          }

          return this.authService.sendOtp(email);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this.isOtpSent = true;
          this.notification.success(
            'OTP Sent',
            'Please check your email for OTP code.'
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
