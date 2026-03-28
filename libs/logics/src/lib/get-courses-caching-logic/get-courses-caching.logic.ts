import { finalize } from 'rxjs';
import { GetCourseCachingLogicImplement } from './get-courses-caching-logic.implement';
import { CourseService } from '@shared/services/course.service';
import { Pagination } from '@shared/models/request/pagination.model';

export abstract class GetCourseCachingLogic extends GetCourseCachingLogicImplement {
  constructor(private courseService: CourseService) {
    super();
  }

  getCourses(pagination: Pagination) {
    return this.courseService
      .getCourses(pagination)
      .pipe(finalize(() => this.getCourseCachingComplete()))
      .subscribe({
        next: (res) => this.getCourseCachingSuccess(res),
        error: (error) => this.getCourseCachingFailed(error),
      });
  }
}
