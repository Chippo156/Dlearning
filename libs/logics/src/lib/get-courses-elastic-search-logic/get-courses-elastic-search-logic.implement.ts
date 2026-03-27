import { ApiResponse } from '@shared/models/api-response.model';
import { CourseResponse } from '@shared/models/course-response.model';
import { PaginationResponse } from '@shared/models/request/pagination.model';

export abstract class GetCourseElasticSearchLogicImplement {
  abstract getCourseElasticSearchSuccess(
    res: ApiResponse<PaginationResponse<CourseResponse>>
  ): void;
  abstract getCourseElasticSearchFailed(error: any): void;
  abstract getCourseElasticSearchComplete(): void;
}
