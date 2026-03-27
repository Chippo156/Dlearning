import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { LoginPageSharedComponent } from '@shared/page/login-page-shared/login-page-shared.component';
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    NzNotificationModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    LoginPageSharedComponent,
  ],
})
export class LoginPageModule {}
