import { AdsCreationResponse } from '@shared/models/data/ads-createtion-response.model';
import { PaginationResponse } from '@shared/models/request/pagination.model';

export abstract class GetAdvertisementsCurrentLoginLogicImplement {
  abstract getAdvertisementsCurrentLoginSuccess(res: PaginationResponse<AdsCreationResponse>): void;
  abstract getAdvertisementsCurrentLoginFailed(error: any): void;
  abstract getAdvertisementsCurrentLoginComplete(): void;
}
