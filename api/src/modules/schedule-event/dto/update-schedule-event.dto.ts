import { PartialType } from '@nestjs/swagger';
import { CreateScheduleEventDto } from './create-schedule-event.dto';

export class UpdateScheduleEventDto extends PartialType(CreateScheduleEventDto) {}
