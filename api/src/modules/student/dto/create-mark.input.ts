import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TypeOfExam, MarkEntity } from '@Modules/student/entities/mark.entity';

export class CreateMarkDto {
  @ApiProperty()
  @IsNumber()
  obtainedMark: number;

  @ApiProperty()
  @IsEnum(MarkEntity)
  typeOfExam: TypeOfExam;

  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  teachId: string;

  @ApiProperty()
  @IsString()
  createdBy: string;
}
