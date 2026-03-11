import { ApiResponse } from '../../models/api-response.model';
import { LoginResponse } from '../../models/data/login-response.model';

export abstract class LoginLogicImplement {
  abstract loginSuccess(res: ApiResponse<LoginResponse>): void;
  abstract loginFailed(error: any): void;
  abstract loginComplete(): void;
}
