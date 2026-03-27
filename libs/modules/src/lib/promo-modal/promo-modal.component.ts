import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AdsActiveResponse } from '@shared/models/data/ads-active-response.model';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

export interface Ad {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  startDate: string;
  endDate: string;
  link: string;
}

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  templateUrl: './promo-modal.component.html',
  styleUrls: ['./promo-modal.component.less'],
  imports: [
    CommonModule,
    NzModalModule,
    NzCarouselModule,
    NzIconModule,
    NzButtonModule,
  ],
})
export class PromoModalComponent {
  @Input() ads: AdsActiveResponse[] = [];
  @Input() visible = true;
  @Input() loading: boolean = false;

  @Output() close = new EventEmitter<void>();

  @ViewChild('carousel') carousel!: NzCarouselComponent;

  prev() {
    this.carousel?.pre();
  }

  next() {
    this.carousel?.next();
  }
}
