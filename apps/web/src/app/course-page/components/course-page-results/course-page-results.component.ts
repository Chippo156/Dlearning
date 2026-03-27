import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseResponse } from '@shared/models/course-response.model';
import { PaginationResponse } from '@shared/models/request/pagination.model';
import { CourseListCardComponent } from '@uis/course-list-card/course-list-card.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-course-page-results',
  templateUrl: './course-page-results.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzPaginationModule,
    CourseListCardComponent,
  ],
})
export class CoursePageResultsComponent {
  @Input({ required: true })
  paginationResponse!: PaginationResponse<CourseResponse>;
  @Output() viewDetail = new EventEmitter<CourseResponse>();
  @Output() addFavourite = new EventEmitter<CourseResponse>();
  @Output() pageChange = new EventEmitter<number>();

  onViewDetail(course: CourseResponse) {
    this.viewDetail.emit(course);
  }

  onAddFavourite(course: CourseResponse) {
    this.addFavourite.emit(course);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
