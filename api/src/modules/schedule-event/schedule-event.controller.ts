import { ScheduleEventService } from './schedule-event.service';
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
import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { UpdateScheduleEventDto } from './dto/update-schedule-event.dto';

@Controller('schedule-event')
export class ScheduleEventController {
  constructor(private readonly scheduleEventService: ScheduleEventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateScheduleEventDto) {
    return this.scheduleEventService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.scheduleEventService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.scheduleEventService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() data: UpdateScheduleEventDto) {
    return this.scheduleEventService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.scheduleEventService.remove(id);
  }
}
