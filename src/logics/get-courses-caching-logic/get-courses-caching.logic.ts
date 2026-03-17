import { finalize } from 'rxjs';
import { GetCourseCachingLogicImplement } from './get-courses-caching-logic.implement';
import { CourseService } from '../../services/course.service';
import { Pagination } from '../../models/request/pagination.model';

export abstract class GetCourseCachingLogic extends GetCourseCachingLogicImplement {
  constructor(private courseService: CourseService) {
    super();
  }

  getCoursesCaching(pagination: Pagination) {
    return this.courseService
      .getCoursesCaching(pagination)
      .pipe(finalize(() => this.getCourseCachingComplete()))
      .subscribe({
        next: (res) => this.getCourseCachingSuccess(res),
        error: (error) => this.getCourseCachingFailed(error),
      });
  }
}
