export interface IPagination<T> {
  totalPages: number;
  actualPage: number;
  nextPage?: number;
  prevPage?: number;
  data: T;
}