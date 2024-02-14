import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmployeeList } from 'src/types/employee';
import {
  EmployeeCreatePayload,
  EmployeeEntity,
  EmployeeFilterOptions,
} from 'src/repositories/models/employee.model';

@Controller('employee')
@ApiTags('Employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get all employees',
  })
  public async getEmployeeList(
    @Query() options?: EmployeeFilterOptions,
  ): Promise<EmployeeList> {
    return this.employeeService.getEmployeeList(options);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get all employees',
  })
  public async getEmployee(@Param('id') id: string): Promise<EmployeeList> {
    console.log('reeeeeeeeeees', id);
    return this.employeeService.getEmployee(id);
  }

  @Post('')
  @ApiOperation({
    summary: 'Create an Employee',
  })
  async createEmployee(
    @Body() payload: EmployeeCreatePayload,
  ): Promise<EmployeeEntity> {
    return this.employeeService.createEmployee(payload);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an Employee',
  })
  async updateEmployee(
    @Param('id') id: string,
    @Body() payload: EmployeeCreatePayload,
  ): Promise<any> {
    return this.employeeService.updateEmployee(id, payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an Employee',
  })
  async deleteEmployee(@Param('id') id: string): Promise<any> {
    return this.employeeService.deleteEmployee(id);
  }
}
