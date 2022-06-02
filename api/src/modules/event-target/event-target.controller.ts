import { EventTargetService } from './event-target.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEventTargetDto, UpdateEventTargetDto } from './dto';

@Controller('event-target')
export class EventTargetController {
  constructor(private readonly eventTargetService: EventTargetService) {}

  @Post()
  create(@Body() data: CreateEventTargetDto) {
    return this.eventTargetService.create(data);
  }

  @Get()
  findAll() {
    return this.eventTargetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTargetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateEventTargetDto) {
    return this.eventTargetService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTargetService.remove(id);
  }
}
