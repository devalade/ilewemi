import { SchoolFeesService } from './school-fees.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateSchoolFeeDto, UpdateSchoolFeeDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SchoolFees')
@Controller('school-fees')
export class SchoolFeesController {
  constructor(private readonly schoolFeesService: SchoolFeesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateSchoolFeeDto) {
    return this.schoolFeesService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.schoolFeesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.schoolFeesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() data: UpdateSchoolFeeDto) {
    return this.schoolFeesService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.schoolFeesService.remove(id);
  }
}
