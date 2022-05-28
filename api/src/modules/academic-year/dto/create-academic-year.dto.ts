import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CreateAcademicYearDto {
  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;
}
