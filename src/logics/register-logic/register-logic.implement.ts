import { ApiResponse } from '../../models/api-response.model';
import { UserRegisterResponse } from '../../models/data/user-register-response.model';

export abstract class RegisterLogicImplement {
  abstract registerSuccess(res: ApiResponse<UserRegisterResponse>): void;
  abstract registerFailed(error: any): void;
  abstract registerComplete(): void;
}
