import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.input';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
