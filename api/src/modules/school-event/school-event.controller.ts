import { SchoolEventService } from './school-event.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSchoolEventDto } from './dto/create-school-event.dto';
import { UpdateSchoolEventDto } from './dto/update-school-event.dto';

@Controller('school-event')
export class SchoolEventController {
  constructor(private readonly schoolEventService: SchoolEventService) {}

  @Post()
  create(@Body() data: CreateSchoolEventDto) {
    return this.schoolEventService.create(data);
  }

  @Get()
  findAll() {
    return this.schoolEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolEventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSchoolEventDto) {
    return this.schoolEventService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolEventService.remove(id);
  }
}
