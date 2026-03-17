import { finalize } from 'rxjs';
import { GetAdvertisementsCurrentLoginLogicImplement } from './get-advertisements-current-login-logic.implement';
import { AdvertisementService } from '@services/advertisement.service';
import { Pagination } from '../../models/request/pagination.model';

export abstract class GetAdvertisementsCurrentLoginLogic extends GetAdvertisementsCurrentLoginLogicImplement {
  constructor(private advertisementService: AdvertisementService) {
    super();
  }

  getAdvertisementsCurrentLogin(pagination: Pagination) {
    return this.advertisementService
      .getAdsCurrentLogin(pagination)
      .pipe(finalize(() => this.getAdvertisementsCurrentLoginComplete()))
      .subscribe({
        next: (res) => this.getAdvertisementsCurrentLoginSuccess(res),
        error: (error) => this.getAdvertisementsCurrentLoginFailed(error),
      });
  }
}
