import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAcademicYearDto {
  @ApiProperty()
  @IsString()
  startDate: any;

  @ApiProperty()
  @IsString()
  endDate: any;
}
