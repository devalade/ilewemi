import { TeachService } from './teach.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTeachDto } from './dto/create-teach.dto';
import { UpdateTeachDto } from './dto/update-teach.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teach')
@Controller('teach')
export class TeachController {
  constructor(private readonly teachService: TeachService) {}

  @Post()
  create(@Body() data: CreateTeachDto) {
    return this.teachService.create(data);
  }

  @Get()
  findAll() {
    return this.teachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTeachDto) {
    return this.teachService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachService.remove(id);
  }
}
