import { PartialType } from '@nestjs/swagger';
import { CreateTypeEventDto } from './create-type-event.dto';

export class UpdateTypeEventDto extends PartialType(CreateTypeEventDto) {}
