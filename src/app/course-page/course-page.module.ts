import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule } from '@angular/forms';
import { CoursePageComponent } from './course-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchCourseComponent } from '@shared/modules/search-course/search-course.component';
import { CommonModule } from '@angular/common';
import { GetCourseElasticSearchUx } from '@uxs/course-uxs/get-course-elastic-search.ux';
import { NzSpinModule } from 'ng-zorro-antd/spin';
const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./course-detail/course-detail.module').then(
        (m) => m.CourseDetailModule,
      ),
  },
];
@NgModule({
  imports: [
    NzSpinModule,
    RouterModule.forChild(routes),
    FormsModule,
    NzSelectModule,
    NzPaginationModule,
    NzToolTipModule,
    CommonModule,
    NzIconModule,
    NzLayoutModule,
    SearchCourseComponent,
    NzLayoutModule,
    GetCourseElasticSearchUx,
  ],
  declarations: [CoursePageComponent],
})
export class CoursePageModule {}
