import { ApiResponse } from '../../models/api-response.model';
import { CourseResponse } from '../../models/course-response.model';
import { PaginationResponse } from '../../models/request/pagination.model';

export abstract class GetCourseCachingLogicImplement {
  abstract getCourseCachingSuccess(res: ApiResponse<PaginationResponse<CourseResponse>>): void;
  abstract getCourseCachingFailed(error: any): void;
  abstract getCourseCachingComplete(): void;
}
