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
  @Input() searchSpecification: string = '';
  @Input() sortBy: string = 'id';

  @Output() onSuccess = new EventEmitter<PaginationResponse<CourseResponse>>();

  loading: boolean = false;
  error: any;

  private data!: Subscription;
  constructor(courseService: CourseService) {
    super(courseService);
  }

  ngOnInit(): void {
    if (this.init) {
      this.getCourses(
        this.pagination,
        this.keyword,
        this.searchSpecification,
        this.sortBy
      );
    }
  }

  override getCourses(
    pagination: Pagination,
    keyword: string,
    searchSpecification: string = '',
    sortBy: string = 'id'
  ): Subscription {
    this.loading = true;

    this.data = super.getCourses(
      pagination,
      keyword,
      searchSpecification,
      sortBy
    );
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
