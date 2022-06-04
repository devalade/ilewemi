import { AttendService } from './attend.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAttendDto, UpdateAttendDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Attend')
@Controller('attend')
export class AttendController {
  constructor(private readonly attendService: AttendService) {}

  @Post()
  create(@Body() data: CreateAttendDto) {
    return this.attendService.create(data);
  }

  @Get()
  findAll() {
    return this.attendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAttendDto) {
    return this.attendService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendService.remove(id);
  }
}
