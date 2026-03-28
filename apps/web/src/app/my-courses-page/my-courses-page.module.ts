import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { MyCoursesPageComponent } from './my-courses-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyCoursesPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
  ],
  declarations: [MyCoursesPageComponent],
})
export class MyCoursesPageModule {}
