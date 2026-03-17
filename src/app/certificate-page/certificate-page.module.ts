import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificatePageComponent } from './certificate-page.component';
import { AdsTableComponent } from '@shared/modules/ads-table/ads-table.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { CertificateCardComponent } from '@shared/modules/certificate-card/certificate-card.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatePageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdsTableComponent,
    NzSelectModule,
    CommonModule,
    CertificateCardComponent,
  ],
  declarations: [CertificatePageComponent],
  exports: [CertificatePageComponent],
})
export class CertificatePageModule {}
