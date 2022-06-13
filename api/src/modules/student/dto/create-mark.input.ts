import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TypeOfExam } from '@Modules/student/entities/mark.entity';

export class CreateMarkDto {
  @ApiProperty()
  @IsNumber()
  obtainedMark: number;

  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  teachId: string;
}
