import { finalize } from 'rxjs';
import { RegisterRequest } from '@shared/models/request/register-request.model';
import { AuthService } from '@shared/services/auth.service';
import { RegisterLogicImplement } from './register-logic.implement';

export abstract class RegisterLogic extends RegisterLogicImplement {
  constructor(private authService: AuthService) {
    super();
  }

  register(req: RegisterRequest, otp: string) {
    return this.authService
      .register(req, otp)
      .pipe(finalize(() => this.registerComplete()))
      .subscribe({
        next: (res) => this.registerSuccess(res),
        error: (error) => this.registerFailed(error),
      });
  }
}
