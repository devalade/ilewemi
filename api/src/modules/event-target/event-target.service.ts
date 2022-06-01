import { Injectable } from '@nestjs/common';
import { CreateEventTargetDto } from './dto/create-event-target.dto';
import { UpdateEventTargetDto } from './dto/update-event-target.dto';

@Injectable()
export class EventTargetService {
  create(createEventTargetDto: CreateEventTargetDto) {
    return 'This action adds a new eventTarget';
  }

  findAll() {
    return `This action returns all eventTarget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventTarget`;
  }

  update(id: number, updateEventTargetDto: UpdateEventTargetDto) {
    return `This action updates a #${id} eventTarget`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventTarget`;
  }
}
