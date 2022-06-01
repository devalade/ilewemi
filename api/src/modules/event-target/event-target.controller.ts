import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventTargetService } from './event-target.service';
import { CreateEventTargetDto } from './dto/create-event-target.dto';
import { UpdateEventTargetDto } from './dto/update-event-target.dto';

@Controller('event-target')
export class EventTargetController {
  constructor(private readonly eventTargetService: EventTargetService) {}

  @Post()
  create(@Body() createEventTargetDto: CreateEventTargetDto) {
    return this.eventTargetService.create(createEventTargetDto);
  }

  @Get()
  findAll() {
    return this.eventTargetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTargetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTargetDto: UpdateEventTargetDto) {
    return this.eventTargetService.update(+id, updateEventTargetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTargetService.remove(+id);
  }
}
