import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export interface ILabeledValue {
  label: string;
}

export type EmployeeEntity = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: string;
  photo: string;
};

export class EmployeeCreatePayload {
  @ApiProperty({
    description: 'Employee first Name',
    example: 'Chamal',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @IsAlpha()
  readonly first_name: string;

  @ApiProperty({
    description: 'Employee last Name',
    example: 'Demel',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @IsAlpha()
  readonly last_name: string;

  @ApiProperty({
    description: 'Employee Email address',
    example: 'chamal@domain.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Employee gender',
    example: 'M',
  })
  @IsIn(['M', 'F'])
  readonly gender: string;

  @ApiProperty({
    description: 'Employee photo URL',
  })
  @IsString()
  readonly photo: string;

  @ApiProperty({
    description: 'Employee phone Number',
    example: '+94700000000',
  })
  @IsString()
  readonly phone: string;
}

function ToInt(): (target: any, key: string) => void {
  return Transform(({ value }) => {
    return parseInt(value);
  });
}
export class EmployeeFilterOptions {
  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  readonly searchTerm?: string;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ToInt()
  readonly pageSize?: number;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ToInt()
  readonly page?: number = 1;
}
