import { NgModule } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { CoursePageComponent } from './course-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchCourseComponent } from '@modules/search-course/search-course.component';
import { CommonModule } from '@angular/common';
import { GetCourseElasticSearchUx } from '@uxs/course-uxs/get-course-elastic-search.ux';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CoursePageHeaderComponent } from '@modules/course-page-header/course-page-header.component';
import { CoursePageSortBarComponent } from '@modules/course-page-sort-bar/course-page-sort-bar.component';
import { CoursePageResultsComponent } from '@modules/course-page-results/course-page-results.component';
const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./course-detail/course-detail.module').then(
        (m) => m.CourseDetailModule
      ),
  },
];
@NgModule({
  imports: [
    NzSpinModule,
    RouterModule.forChild(routes),
    FormsModule,
    NzToolTipModule,
    CommonModule,
    NzIconModule,
    SearchCourseComponent,
    GetCourseElasticSearchUx,
    CoursePageHeaderComponent,
    CoursePageSortBarComponent,
    CoursePageResultsComponent,
  ],
  declarations: [CoursePageComponent],
})
export class CoursePageModule {}
