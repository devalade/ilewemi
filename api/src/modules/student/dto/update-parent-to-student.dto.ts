import { PartialType } from '@nestjs/swagger';
import { CreateParentToStudentDto } from '.';

export class UpdateParentToStudentDto extends PartialType(
  CreateParentToStudentDto,
) {}
