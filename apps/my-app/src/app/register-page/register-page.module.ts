import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageSharedComponent } from '@shared/page/register-page-shared/register-page-shared.component';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
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
    RegisterPageSharedComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
  ],
})
export class RegisterPageModule {}
