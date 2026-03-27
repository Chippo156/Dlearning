import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormModule } from '@shared/form/login-form/login-form.module';
import { LoginUx } from '@uxs/login.ux';

@Component({
  selector: 'app-login-page-shared',
  templateUrl: './login-page-shared.component.html',
  standalone: true,
  imports: [LoginFormModule, LoginUx],
})
export class LoginPageSharedComponent {
  constructor(private router: Router) {}

  onLoginSuccess() {
    this.router.navigate(['/home']);
  }
}
