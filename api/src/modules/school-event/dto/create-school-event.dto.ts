import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSchoolEventDto {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsString()
  typeEventId: string;
}
