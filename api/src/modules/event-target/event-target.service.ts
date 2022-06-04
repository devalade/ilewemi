import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from '../class/entities/class.entity';
import { SchoolEventEntity } from '../school-event/entities/school-event.entity';
import { CreateEventTargetDto, UpdateEventTargetDto } from './dto';
import { EventTargetEntity } from './entities/event-target.entity';

@Injectable()
export class EventTargetService {
  constructor(
    @InjectRepository(EventTargetEntity)
    private eventTargetRepository: Repository<EventTargetEntity>,
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
    @InjectRepository(SchoolEventEntity)
    private schoolEventEntity: Repository<SchoolEventEntity>,
  ) {}

  async create(data: CreateEventTargetDto) {
    const { classId, schooldEventId } = data;
    const _class = await this.classRepository.findOneOrFail(classId);
    const schoolEvent = await this.schoolEventEntity.findOneOrFail(
      schooldEventId,
    );
    return await this.eventTargetRepository.insert({
      class: _class,
      schoolEvent,
    });
  }

  async findAll() {
    return await this.eventTargetRepository.find();
  }

  async findOne(id: string) {
    return await this.eventTargetRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateEventTargetDto) {
    const { classId, schooldEventId } = data;
    const _class = await this.classRepository.findOneOrFail(classId);
    const schoolEvent = await this.schoolEventEntity.findOneOrFail(
      schooldEventId,
    );
    return await this.eventTargetRepository.update(id, {
      class: _class,
      schoolEvent,
    });
  }

  async remove(id: string) {
    return await this.eventTargetRepository.delete(id);
  }
}
