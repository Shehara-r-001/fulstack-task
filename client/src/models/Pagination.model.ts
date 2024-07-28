export interface IPaginationRequest {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: SortType;
  query?: string;
  filters?: string;
}

enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IPaginatedResponse<T> extends IPaginationRequest {
  list: T[];
  itemCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
