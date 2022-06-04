import { TypeEventService } from './type-event.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTypeEventDto, UpdateTypeEventDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TypeEvent')
@Controller('type-event')
export class TypeEventController {
  constructor(private readonly typeEventService: TypeEventService) {}

  @Post()
  create(@Body() data: CreateTypeEventDto) {
    return this.typeEventService.create(data);
  }

  @Get()
  findAll() {
    return this.typeEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeEventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTypeEventDto) {
    return this.typeEventService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeEventService.remove(id);
  }
}
