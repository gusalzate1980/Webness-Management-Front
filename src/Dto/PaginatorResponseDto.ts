export interface PaginatorResponseDto<T> {
  TotalRecords: number;
  TotalRecordsFetched: number;
  TotalPages: number;
  Records: T[];
}