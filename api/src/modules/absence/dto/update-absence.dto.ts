import { PartialType } from '@nestjs/swagger';
import { CreateAbsenceDto } from './create-absence.dto';

export class UpdateAbsenceDto extends PartialType(CreateAbsenceDto) {}
