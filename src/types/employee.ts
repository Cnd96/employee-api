import { EmployeeEntity } from 'src/repositories/models/employee.model';

export type EmployeeList = {
  count: number;
  employees: EmployeeEntity[];
  currentPage: number;
  pagesCount: number;
};
