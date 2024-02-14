import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import {
  EmployeeCreatePayload,
  EmployeeEntity,
  EmployeeFilterOptions,
} from './models/employee.model';
import { EmployeeList } from 'src/types/employee';

type EmployeeWithCount = EmployeeEntity & {
  count: number;
};

@Injectable()
export class EmployeeRepository {
  constructor(protected readonly sequelize: Sequelize) {}

  public async getEmployee(idd: string): Promise<any> {
    const employee = await this.sequelize.query<EmployeeWithCount>(
      `SELECT *
      FROM public.employee
      where id = :idd`,
      {
        type: QueryTypes.SELECT,
        logging: true,
        replacements: {
          idd: idd,
        },
      },
    );
    return {
      employee: employee[0],
    };
  }

  public async getEmployeeList(
    options?: EmployeeFilterOptions,
  ): Promise<EmployeeList> {
    const pageSize = options.pageSize;
    const page = options.page;

    const searchTerm = options.searchTerm || '';

    const employeesWithCount = await this.sequelize.query<EmployeeWithCount>(
      `SELECT *, COUNT(*) OVER() AS count
      FROM public.employee
      where first_name ILIKE :searchTerm OR last_name ILIKE :searchTerm
      ORDER BY id
      OFFSET :pageOffset
      LIMIT :pageSize`,
      {
        type: QueryTypes.SELECT,
        logging: false,
        replacements: {
          pageSize: pageSize ? pageSize : null,
          pageOffset: pageSize && page && page > 1 ? pageSize * (page - 1) : 0,
          searchTerm: `%${searchTerm}%`,
        },
      },
    );
    if (employeesWithCount.length > 0) {
      const count = employeesWithCount[0].count;
      const employees = employeesWithCount.map<EmployeeEntity>((employee) => ({
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        photo: employee.photo,
      }));
      return {
        count,
        employees,
        pagesCount: Math.ceil(count / pageSize),
        currentPage: page,
      };
    }
    return {
      count: 0,
      currentPage: 0,
      pagesCount: 0,
      employees: [],
    };
  }

  public async createEmployee(
    data: EmployeeCreatePayload,
  ): Promise<EmployeeEntity> {
    const [results] = await this.sequelize.query(
      `
        INSERT INTO public.employee(
        first_name, last_name, phone, email, gender, photo)
        VALUES (:first_name, :last_name, :phone, :email, :gender, :photo)
        RETURNING
          id, first_name, last_name, phone, email, gender, photo;
      `,
      {
        type: QueryTypes.INSERT,
        replacements: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
          photo: data.photo,
        },
      },
    );
    return results[0];
  }

  public async updateEmployee(
    empId: string,
    data: EmployeeCreatePayload,
  ): Promise<any> {
    const results = await this.sequelize.query(
      `UPDATE
         public.employee
       SET
         first_name=:first_name,
         last_name=:last_name,
         phone=:phone,
         email=:email,
         gender=:gender,
         photo=:photo
        WHERE
          id = :empId
      `,
      {
        type: QueryTypes.INSERT,
        replacements: {
          empId,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
          photo: data.photo,
        },
      },
    );
    return results;
  }

  public async deleteEmployee(empId: string): Promise<any> {
    const results = await this.sequelize.query(
      `DELETE FROM public.employee
        WHERE
          id = :empId
      `,
      {
        type: QueryTypes.INSERT,
        replacements: {
          empId,
        },
      },
    );
    return results;
  }
}
