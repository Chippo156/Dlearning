import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { GetCourseCachingUx } from '@uxs/course-uxs/get-course-caching.ux';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';
import { CourseResponse } from '@shared/models/course-response.model';

@Component({
  selector: 'app-our-courses',
  templateUrl: './our-courses.component.html',
  standalone: true,
  imports: [
    NzCardModule,
    NzRateModule,
    NzButtonModule,
    FormsModule,
    CommonModule,
    GetCourseCachingUx,
  ],
})
export class OurCoursesComponent {
  hasMore: boolean = true;

  pagination: Pagination = {
    currentPage: 1,
    pageSize: 4,
  };
  paginationRes: PaginationResponse<CourseResponse> | null = null;

  @ViewChild('ux') getCourseCachingUx!: GetCourseCachingUx;

  constructor(private router: Router) {}

  handleDetailCourse(id: number) {
    this.router.navigate(['/courses', id]);
  }

  truncate(text: string, maxWords: number): string {
    const words = text.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : text;
  }

  handleAddFavourite(id: number) {
    console.log('Favourite course:', id);
  }

  loadMoreCourses() {
    if (this.hasMore) {
      this.pagination.currentPage++;
      this.getCourseCachingUx.getCoursesCaching(this.pagination);
    }
  }

  onGetCoursesSuccess(res: PaginationResponse<CourseResponse>) {
    if (res.currentPage >= res.totalPages) {
      this.hasMore = false;
    }
    this.paginationRes = {
      ...res,
      result: [...(this.paginationRes?.result || []), ...res.result],
    };
  }
}
