import { PartialType } from '@nestjs/swagger';
import { CreateAttendDto } from './create-attend.dto';

export class UpdateAttendDto extends PartialType(CreateAttendDto) {}
