import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  group: string;

  @ApiProperty()
  @IsNumber()
  fee: number;

  @IsString({
    each: true,
  })
  subjects: string[];
}
