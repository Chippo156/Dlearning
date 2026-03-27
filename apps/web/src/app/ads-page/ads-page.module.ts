import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdsPageComponent } from './ads-page.component';
import { AdsTableComponent } from '@modules/ads-table/ads-table.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const routes: Routes = [
  {
    path: '',
    component: AdsPageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdsTableComponent,
    NzSelectModule,
    CommonModule,
    NzSpinModule,
  ],
  declarations: [AdsPageComponent],
  exports: [AdsPageComponent],
})
export class AdsPageModule {}
