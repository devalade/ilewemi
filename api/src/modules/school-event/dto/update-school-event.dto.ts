import { PartialType } from '@nestjs/swagger';
import { CreateSchoolEventDto } from './create-school-event.dto';

export class UpdateSchoolEventDto extends PartialType(CreateSchoolEventDto) {}
