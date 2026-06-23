export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}


// NEW: Pagination metadata
export interface PagedResult<T> {
  data: T[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
