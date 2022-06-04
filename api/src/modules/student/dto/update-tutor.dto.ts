import { PartialType } from '@nestjs/swagger';
import { CreateTutorDto } from '.';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {}
