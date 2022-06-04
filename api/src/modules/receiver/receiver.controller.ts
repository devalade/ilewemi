import { ReceiverService } from './receiver.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Receiver')
@Controller('receiver')
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @Post()
  create(@Body() data: CreateReceiverDto) {
    return this.receiverService.create(data);
  }

  @Get()
  findAll() {
    return this.receiverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateReceiverDto) {
    return this.receiverService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiverService.remove(id);
  }
}
