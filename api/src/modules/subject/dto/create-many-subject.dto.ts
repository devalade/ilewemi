import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString } from 'class-validator';
import { CreateSubjectDto } from './create-subject.dto';

export class CreateManySubjectDto {
  @ApiProperty()
  // @IsArray({
  //   each: true,
  //   message: '',
  // })
  subjects: any;
}
