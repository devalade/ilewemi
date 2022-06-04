import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReceiverDto {
  @ApiProperty()
  @IsString()
  tutorId: string;

  @ApiProperty()
  @IsString()
  messageId: string;
}
