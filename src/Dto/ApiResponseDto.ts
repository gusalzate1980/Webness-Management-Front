export interface ApiResponseDto<T> {
  ResponseValue: T | null;
  ExecutionOk: boolean;
  Errors: string[];
}