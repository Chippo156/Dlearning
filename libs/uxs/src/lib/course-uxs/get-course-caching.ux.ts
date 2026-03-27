import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseResponse } from '@shared/models/course-response.model';
import { Pagination } from '@shared/models/request/pagination.model';
import { PaginationResponse } from '@shared/models/request/pagination.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { GetCourseCachingLogic } from '@logics/get-courses-caching-logic/get-courses-caching.logic';
import { CourseService } from '@shared/services/course.service';

@Component({
  selector: 'app-get-courses-caching-ux',
  template: '',
  standalone: true,
})
export class GetCourseCachingUx
  extends GetCourseCachingLogic
  implements OnDestroy
{
  @Input() init: boolean = false;
  @Input() pagination!: Pagination;
  @Output() onSuccess = new EventEmitter<PaginationResponse<CourseResponse>>();

  loading: boolean = false;
  error: any;

  private data!: Subscription;
  constructor(courseService: CourseService) {
    super(courseService);
  }

  ngOnInit(): void {
    if (this.init) {
      this.getCoursesCaching(this.pagination);
    }
  }

  override getCoursesCaching(pagination: Pagination): Subscription {
    this.loading = true;

    this.data = super.getCoursesCaching(pagination);
    return this.data;
  }

  ngOnDestroy(): void {
    this.data && this.data.unsubscribe();
  }
  getCourseCachingSuccess(
    res: ApiResponse<PaginationResponse<CourseResponse>>
  ): void {
    this.loading = false;

    this.onSuccess.emit(res.data);
  }

  getCourseCachingFailed(error: any): void {
    this.loading = false;
    this.error = error;
  }

  getCourseCachingComplete(): void {
    this.loading = false;
  }
}
