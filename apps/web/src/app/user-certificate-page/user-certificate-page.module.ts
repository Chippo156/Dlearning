import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCertificatePageComponent } from './user-certificate-page.component';
import { AdsTableComponent } from '@modules/ads-table/ads-table.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { CertificateCardComponent } from '@modules/certificate-card/certificate-card.component';

const routes: Routes = [
  {
    path: '',
    component: UserCertificatePageComponent,
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
  declarations: [UserCertificatePageComponent],
  exports: [UserCertificatePageComponent],
})
export class UserCertificatePageModule {}
