import { finalize } from 'rxjs';
import { GetCourseElasticSearchLogicImplement } from './get-courses-elastic-search-logic.implement';
import { CourseService } from '@shared/services/course.service';
import { Pagination } from '@shared/models/request/pagination.model';

export abstract class GetCourseElasticSearchLogic extends GetCourseElasticSearchLogicImplement {
  constructor(private courseService: CourseService) {
    super();
  }

  getCourses(
    pagination: Pagination,
    keyword: string,
    searchSpecification: string = '',
    sortBy: string = 'id'
  ) {
    const keywordSpecification = keyword?.trim()
      ? `title:${keyword.trim()}`
      : '';

    const search = [keywordSpecification, searchSpecification]
      .map((item) => item?.trim())
      .filter(Boolean)
      .join(',');

    return this.courseService
      .getCoursesBySpecification(pagination, sortBy, search)
      .pipe(finalize(() => this.getCourseElasticSearchComplete()))
      .subscribe({
        next: (res) => this.getCourseElasticSearchSuccess(res),
        error: (error) => this.getCourseElasticSearchFailed(error),
      });
  }
}
