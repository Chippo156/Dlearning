import { AdsCreationResponse } from '@models/data/ads-createtion-response.model';
import { PaginationResponse } from '../../models/request/pagination.model';

export abstract class GetAdvertisementsCurrentLoginLogicImplement {
  abstract getAdvertisementsCurrentLoginSuccess(res: PaginationResponse<AdsCreationResponse>): void;
  abstract getAdvertisementsCurrentLoginFailed(error: any): void;
  abstract getAdvertisementsCurrentLoginComplete(): void;
}
