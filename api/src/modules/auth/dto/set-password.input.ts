import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@src/modules/common/decorators/validator/match.decorator';
import { IsString, Matches, MinLength } from 'class-validator';

export class SetPassordDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(8)
  @Match('password')
  confirmPassword: string;
}
