import { PartialType } from '@nestjs/swagger';
import { CreateMarkDto } from '.';

export class UpdateMarkDto extends PartialType(CreateMarkDto) {}
