export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  result: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
