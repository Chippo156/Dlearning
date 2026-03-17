import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AdvertisementService } from '@services/advertisement.service';
import { GetActiveAdvertisementsLogic } from '@logics/get-active-advertisements-logic/get-active-advertisements.logic';
import { Pagination } from '@models/request/pagination.model';
import { AdsActiveResponse } from '@models/data/ads-active-response.model';

@Component({
  selector: 'app-get-active-advertisements-ux',
  template: '',
  standalone: true,
})
export class GetActiveAdvertisementsUx
  extends GetActiveAdvertisementsLogic
  implements OnDestroy, OnInit
{
  @Input() init: '' | boolean = false;
  @Output() success = new EventEmitter<AdsActiveResponse[]>();

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<any>(null);

  pagination: Pagination = { currentPage: 1, pageSize: 10 };

  result$ = new BehaviorSubject<AdsActiveResponse[]>([]);

  private data!: Subscription;
  constructor(
    advertisementService: AdvertisementService,
    private notification: NzNotificationService,
  ) {
    super(advertisementService);
  }
  ngOnInit(): void {
    if (this.init === '' || this.init === true) {
      this.getAdsActive();
    }
  }

  override getAdsActive(): Subscription {
    this.loading$.next(true);

    this.data = super.getAdsActive();
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }

  override getAdsActiveSuccess(res: AdsActiveResponse[]): void {
    this.loading$.next(false);

    this.result$.next(res);
    this.success.emit(res);
  }

  override getAdsActiveFailed(error: any): void {
    this.loading$.next(false);

    this.notification.error(
      'Get Advertisements Failed',
      error.message || 'An error occurred while fetching advertisements.',
    );
    this.error$.next(error);
  }

  override getAdsActiveComplete(): void {
    this.loading$.next(false);
  }
}
