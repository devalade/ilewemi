import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateReceiverDto } from './create-receiver.dto';

export class UpdateReceiverDto extends PartialType(CreateReceiverDto) {
  @ApiProperty()
  @IsBoolean()
  isReaded: boolean;
}
