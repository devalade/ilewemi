import { PartialType } from '@nestjs/swagger';
import { CreateEventTargetDto } from './create-event-target.dto';

export class UpdateEventTargetDto extends PartialType(CreateEventTargetDto) {}
