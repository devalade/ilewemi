import { PartialType } from '@nestjs/swagger';
import { CreateSchoolFeeDto } from './create-school-fee.dto';

export class UpdateSchoolFeeDto extends PartialType(CreateSchoolFeeDto) {}
