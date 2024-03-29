import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import {
  EmployeeCreatePayload,
  EmployeeEntity,
  EmployeeFilterOptions,
} from 'src/repositories/models/employee.model';
import { EmployeeList } from 'src/types/employee';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}
  // @Cache('getEmployeeList', 2)
  // public async getEmployeeList(options?: EmployeeFilterOptions): Promise<any> {
  //   const employees = [{ id: '0', name: 'cham al' }];
  //   console.log('get eee');
  //   // await this.employeeRepository.getEmployeeList(options);
  //   return employees;
  // }

  public async getEmployeeList(
    options?: EmployeeFilterOptions,
  ): Promise<EmployeeList> {
    const employees = await this.employeeRepository.getEmployeeList(options);
    return employees;
  }

  public async getEmployee(
    id: string,
  ): Promise<any> {
    const employees = await this.employeeRepository.getEmployee(id);
    return employees;
  }

  public async createEmployee(
    payload: EmployeeCreatePayload,
  ): Promise<EmployeeEntity> {
    const employees = await this.employeeRepository.createEmployee(payload);
    return employees;
  }

  public async updateEmployee(
    id: string,
    payload: EmployeeCreatePayload,
  ): Promise<any> {
    return this.employeeRepository.updateEmployee(id, payload);
  }
  public async deleteEmployee(id: string): Promise<any> {
    return this.employeeRepository.deleteEmployee(id);
  }
}
