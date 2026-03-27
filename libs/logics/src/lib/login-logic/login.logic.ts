import { finalize } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { LoginLogicImplement } from './login-logic.implement';
import { LoginRequest } from '@shared/models/request/login-request.model';

export abstract class LoginLogic extends LoginLogicImplement {
  constructor(private authService: AuthService) {
    super();
  }

  login(req: LoginRequest) {
    return this.authService
      .login(req)
      .pipe(finalize(() => this.loginComplete()))
      .subscribe({
        next: (res) => this.loginSuccess(res),
        error: (error) => this.loginFailed(error),
      });
  }
}
