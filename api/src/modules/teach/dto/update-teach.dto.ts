import { PartialType } from '@nestjs/swagger';
import { CreateTeachDto } from './create-teach.dto';

export class UpdateTeachDto extends PartialType(CreateTeachDto) {}
