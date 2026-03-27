import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { AdvertisementService } from '@shared/services/advertisement.service';
import { GetAdvertisementsCurrentLoginLogic } from '@logics/get-advertisements-current-login-logic/get-advertisements-current-login.logic';
import { AdsCreationResponse } from '@shared/models/data/ads-createtion-response.model';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';

@Component({
  selector: 'app-get-advertisements-current-login-ux',
  template: '',
  standalone: true,
})
export class GetAdvertisementsCurrentLoginUx
  extends GetAdvertisementsCurrentLoginLogic
  implements OnDestroy, OnInit
{
  @Input() init: '' | boolean = false;
  @Output() success = new EventEmitter<
    PaginationResponse<AdsCreationResponse>
  >();

  loading: boolean = false;
  error: any;

  pagination: Pagination = { currentPage: 1, pageSize: 10 };
  result!: PaginationResponse<AdsCreationResponse>;

  private data!: Subscription;
  constructor(
    advertisementService: AdvertisementService,
    private notification: NzNotificationService,
  ) {
    super(advertisementService);
  }
  ngOnInit(): void {
    if (this.init === '' || this.init === true) {
      this.getAdvertisementsCurrentLogin(this.pagination);
    }
  }

  override getAdvertisementsCurrentLogin(pagination: Pagination): Subscription {
    this.loading = true;

    this.data = super.getAdvertisementsCurrentLogin(pagination);
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }

  override getAdvertisementsCurrentLoginSuccess(
    res: PaginationResponse<AdsCreationResponse>,
  ): void {
    this.loading = false;
    this.result = res;
    this.success.emit(res);
  }

  override getAdvertisementsCurrentLoginFailed(error: any): void {
    this.loading = false;

    this.notification.error(
      'Get Advertisements Current Login Failed',
      error.message || 'An error occurred while fetching advertisements.',
    );
    this.error = error;
  }

  override getAdvertisementsCurrentLoginComplete(): void {
    this.loading = false;
  }
}
