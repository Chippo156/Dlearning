import { ApiResponse } from '@shared/models/api-response.model';
import { CourseResponse } from '@shared/models/course-response.model';
import { PaginationResponse } from '@shared/models/request/pagination.model';

export abstract class GetCourseCachingLogicImplement {
  abstract getCourseCachingSuccess(
    res: ApiResponse<PaginationResponse<CourseResponse>>
  ): void;
  abstract getCourseCachingFailed(error: any): void;
  abstract getCourseCachingComplete(): void;
}
