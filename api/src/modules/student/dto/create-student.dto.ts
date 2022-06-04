import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  studentCode: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
