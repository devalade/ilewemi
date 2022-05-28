import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Unique } from '@src/modules/common/decorators/validator/unique.validator';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { CreateUserDto } from './create-user.input';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Unique([UserEntity])
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Unique([UserEntity])
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;
}
