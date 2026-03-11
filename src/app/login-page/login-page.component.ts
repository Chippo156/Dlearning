import { Component } from '@angular/core';
import { LoginRequest } from '../../models/request/login-request.model';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.less',
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  onLoginSuccess() {
    this.router.navigate(['/home']);
  }
}
