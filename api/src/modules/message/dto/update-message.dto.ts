import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from '.';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
