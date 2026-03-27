import { NgModule } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';

import { RouterModule, Routes } from '@angular/router';

import { CourseFeatureComponent } from '@modules/course-feature/course-feature.component';
import { CourseContentComponent } from '@modules/course-content/course-content.component';
import { CourseDetailComponent } from './course-detail.component';
import { CommonModule } from '@angular/common';
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
    component: CourseDetailComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NzSpinModule,
    NzTabsModule,
    NzTableModule,
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,

    CourseFeatureComponent,
    CourseContentComponent,
  ],
  declarations: [CourseDetailComponent],
})
export class CourseDetailModule {}
