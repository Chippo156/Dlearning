import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ForgotPasswordFormModule } from '@shared/form/forgot-password-form/forgot-password-form.module';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPageComponent,
  },
];

@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    NzNotificationModule,
    ForgotPasswordFormModule,
  ],
})
export class ForgotPasswordPageModule {}
