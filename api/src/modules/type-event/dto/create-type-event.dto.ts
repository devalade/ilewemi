import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTypeEventDto {
  @ApiProperty()
  @IsString()
  label: string;
}
