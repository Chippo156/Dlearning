import { finalize } from 'rxjs';
import { GetCourseElasticSearchLogicImplement } from './get-courses-elastic-search-logic.implement';
import { CourseService } from '../../services/course.service';
import { Pagination } from '../../models/request/pagination.model';

export abstract class GetCourseElasticSearchLogic extends GetCourseElasticSearchLogicImplement {
  constructor(private courseService: CourseService) {
    super();
  }

  getCoursesElasticSearch(pagination: Pagination, keyword: string) {
    return this.courseService
      .getCoursesElasticSearch(pagination, keyword)
      .pipe(finalize(() => this.getCourseElasticSearchComplete()))
      .subscribe({
        next: (res) => this.getCourseElasticSearchSuccess(res),
        error: (error) => this.getCourseElasticSearchFailed(error),
      });
  }
}
