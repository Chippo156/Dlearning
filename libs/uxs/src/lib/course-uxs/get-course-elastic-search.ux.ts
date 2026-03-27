import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { GetCourseElasticSearchLogic } from '@logics/get-courses-elastic-search-logic/get-courses-elastic-search.logic';
import { ApiResponse } from '@shared/models/api-response.model';
import { CourseService } from '@shared/services/course.service';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';
import { CourseResponse } from '@shared/models/course-response.model';

@Component({
  selector: 'app-get-courses-elastic-search-ux',
  template: '',
  standalone: true,
})
export class GetCourseElasticSearchUx
  extends GetCourseElasticSearchLogic
  implements OnDestroy
{
  @Input() init: boolean = false;
  @Input() pagination!: Pagination;
  @Input() keyword!: string;

  @Output() onSuccess = new EventEmitter<PaginationResponse<CourseResponse>>();

  loading: boolean = false;
  error: any;

  private data!: Subscription;
  constructor(courseService: CourseService) {
    super(courseService);
  }

  ngOnInit(): void {
    if (this.init) {
      this.getCoursesElasticSearch(this.pagination, this.keyword);
    }
  }

  override getCoursesElasticSearch(
    pagination: Pagination,
    keyword: string
  ): Subscription {
    this.loading = true;

    this.data = super.getCoursesElasticSearch(pagination, keyword);
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }

  getCourseElasticSearchSuccess(
    res: ApiResponse<PaginationResponse<CourseResponse>>
  ): void {
    this.loading = false;

    this.onSuccess.emit(res.data);
  }

  getCourseElasticSearchFailed(error: any): void {
    this.loading = false;
    this.error = error;
  }

  getCourseElasticSearchComplete(): void {
    this.loading = false;
  }
}
