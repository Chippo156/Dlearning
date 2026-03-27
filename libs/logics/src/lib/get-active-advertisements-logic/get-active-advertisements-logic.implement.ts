import { AdsActiveResponse } from '@shared/models/data/ads-active-response.model';

export abstract class GetActiveAdvertisementsLogicImplement {
  abstract getAdsActiveSuccess(res: AdsActiveResponse[]): void;
  abstract getAdsActiveFailed(error: any): void;
  abstract getAdsActiveComplete(): void;
}
