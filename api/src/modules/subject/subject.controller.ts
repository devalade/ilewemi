import { SubjectService } from './subject.service';
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
import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateManySubjectDto } from './dto/create-many-subject.dto';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateSubjectDto) {
    return this.subjectService.create(data);
  }

  @Post('many')
  @HttpCode(HttpStatus.CREATED)
  createMany(@Body() data: any) {
    return this.subjectService.createMany(data);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
