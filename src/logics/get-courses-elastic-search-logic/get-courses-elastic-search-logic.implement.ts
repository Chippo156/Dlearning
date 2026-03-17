import { ApiResponse } from '../../models/api-response.model';
import { CourseResponse } from '../../models/course-response.model';
import { PaginationResponse } from '../../models/request/pagination.model';

export abstract class GetCourseElasticSearchLogicImplement {
  abstract getCourseElasticSearchSuccess(res: ApiResponse<PaginationResponse<CourseResponse>>): void;
  abstract getCourseElasticSearchFailed(error: any): void;
  abstract getCourseElasticSearchComplete(): void;
}
