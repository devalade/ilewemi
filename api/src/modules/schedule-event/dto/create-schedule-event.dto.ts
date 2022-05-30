import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { OPERATION_STATUS } from '../entities/schedule-event.entity';

export class CreateScheduleEventDto {
  @ApiProperty()
  @IsString()
  operationStatus: OPERATION_STATUS;

  @ApiProperty()
  @IsDate()
  publishingDate: Date;

  @ApiProperty()
  @IsString()
  documentId: string;
}
