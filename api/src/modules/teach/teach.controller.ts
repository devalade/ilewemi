import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachService } from './teach.service';
import { CreateTeachDto } from './dto/create-teach.dto';
import { UpdateTeachDto } from './dto/update-teach.dto';

@Controller('teach')
export class TeachController {
  constructor(private readonly teachService: TeachService) {}

  @Post()
  create(@Body() createTeachDto: CreateTeachDto) {
    return this.teachService.create(createTeachDto);
  }

  @Get()
  findAll() {
    return this.teachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeachDto: UpdateTeachDto) {
    return this.teachService.update(+id, updateTeachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachService.remove(+id);
  }
}
