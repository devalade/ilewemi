import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSchoolFeeDto {
  @ApiProperty()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @IsString()
  classId: string;

  @ApiProperty()
  @IsString()
  academicYearId: string;
}
