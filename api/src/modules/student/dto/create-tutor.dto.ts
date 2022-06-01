import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTutorDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
