import { finalize } from 'rxjs';
import { AdvertisementService } from '@shared/services/advertisement.service';
import { GetActiveAdvertisementsLogicImplement } from './get-active-advertisements-logic.implement';

export abstract class GetActiveAdvertisementsLogic extends GetActiveAdvertisementsLogicImplement {
  constructor(private advertisementService: AdvertisementService) {
    super();
  }

  getAdsActive() {
    return this.advertisementService
      .getAdsActive()
      .pipe(finalize(() => this.getAdsActiveComplete()))
      .subscribe({
        next: (res) => this.getAdsActiveSuccess(res),
        error: (error) => this.getAdsActiveFailed(error),
      });
  }
}
