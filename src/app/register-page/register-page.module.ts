import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormModule } from '../../shared/form/register-form/register-form.module';
import { OtpComponent } from '../../shared/form/otp-form/otp-form.component';
import { RegisterUx } from '../../uxs/register.ux';
const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
  },
];
@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzNotificationModule,
    ReactiveFormsModule,
    RegisterFormModule,
    OtpComponent,
    RegisterUx,
  ],
})
export class RegisterPageModule {}
