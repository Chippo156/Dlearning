import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificateTemplatePageComponent } from './certificate-template-page.component';
import { AdsTableComponent } from '@modules/ads-table/ads-table.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { CertificateCardComponent } from '@modules/certificate-card/certificate-card.component';

import { CertificateContentComponent } from '@modules/certificate-content/certificate-content.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateTemplatePageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdsTableComponent,
    NzSelectModule,
    CommonModule,
    CertificateCardComponent,
    CertificateContentComponent
  ],
  declarations: [CertificateTemplatePageComponent],
  exports: [CertificateTemplatePageComponent],
})
export class CertificateTemplatePageModule {}
