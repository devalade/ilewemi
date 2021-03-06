import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../message/entities/message.entity';
import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { UpdateScheduleEventDto } from './dto/update-schedule-event.dto';
import { ScheduleEventEntity } from './entities/schedule-event.entity';

@Injectable()
export class ScheduleEventService {
  constructor(
    @InjectRepository(ScheduleEventEntity)
    private scheduleEventRepository: Repository<ScheduleEventEntity>,
    @InjectRepository(MessageEntity)
    private docuementRepository: Repository<ScheduleEventEntity>,
  ) {}

  async create(data: CreateScheduleEventDto) {
    try {
      const { operationStatus, publishingDate, messageId } = data;
      const message = await this.docuementRepository.findOneOrFail(messageId);
      return await this.scheduleEventRepository.insert({
        message,
        publishingDate,
        operationStatus,
      });
    } catch (error) {
      throw new ForbiddenException('Acces Denied');
    }
  }

  async findAll() {
    return await this.scheduleEventRepository.find();
  }

  async findOne(id: string) {
    return await this.scheduleEventRepository.findOne(id);
  }

  update(id: string, data: UpdateScheduleEventDto) {
    const { operationStatus } = data;
    return this.scheduleEventRepository.update(id, {
      operationStatus,
    });
  }

  async remove(id: string) {
    return await this.scheduleEventRepository.delete(id);
  }
}
