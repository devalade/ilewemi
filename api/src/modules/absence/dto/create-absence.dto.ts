import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateAbsenceDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsString()
  academicYearId: string;

  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  createdBy: string;
}
