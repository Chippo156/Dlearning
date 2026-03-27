import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { GetAdvertisementsCurrentLoginUx } from '@uxs/advertisement-uxs/get-advertisements-current-login/get-advertisements-current-login.ux';
import { Subject } from 'rxjs';

export interface Ads {
  id: number;
  title: string;
  image: string;
  description: string;
  contactEmail: string;
  startDate: string;
  endDate: string;
  contactPhone: string;
  adsStatus: string;
}
@Component({
  selector: 'app-ads-table',
  templateUrl: './ads-table.component.html',
  styleUrls: ['./ads-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzPaginationModule,
    NzImageModule,
    NzAvatarComponent,
    GetAdvertisementsCurrentLoginUx,
  ],
})
export class AdsTableComponent {
  @Output()
  pageChange = new EventEmitter<number>();
  currentPage = 1;

  pageChange$ = new Subject<number>();

  @ViewChild('ux') ux!: GetAdvertisementsCurrentLoginUx;

  ngOnInit(): void {
    this.pageChange$.subscribe((page) => {
      this.currentPage = page;
      this.ux.getAdvertisementsCurrentLogin({
        currentPage: page,
        pageSize: this.ux.pagination.pageSize,
      });
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pageChange$.next(page);
  }
}
