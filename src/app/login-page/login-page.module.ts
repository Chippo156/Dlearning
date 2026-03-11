import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { LoginFormModule } from '../../shared/form/login-form/login-form.module';
import { LoginUx } from '../../uxs/login.ux';
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    NzNotificationModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    LoginFormModule,
    LoginUx,
  ],
})
export class LoginPageModule {}
