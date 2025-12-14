export default interface PageResponse<T> {
  content: T[];
  number: number; // 현재 page
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
