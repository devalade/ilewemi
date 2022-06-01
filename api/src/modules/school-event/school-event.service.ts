import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeEventEntity } from '../type-event/entities/type-event.entity';
import { CreateSchoolEventDto } from './dto/create-school-event.dto';
import { UpdateSchoolEventDto } from './dto/update-school-event.dto';
import { SchoolEventEntity } from './entities/school-event.entity';

@Injectable()
export class SchoolEventService {
  constructor(
    @InjectRepository(SchoolEventEntity)
    private schoolEventRepository: Repository<SchoolEventEntity>,
    @InjectRepository(TypeEventEntity)
    private typeEventRepository: Repository<TypeEventEntity>,
  ) {}

  async create(data: CreateSchoolEventDto) {
    const { label, typeEventId } = data;
    const typeEvent = await this.typeEventRepository.findOneOrFail(typeEventId);

    return await this.schoolEventRepository.insert({
      label,
      typeEvent,
    });
  }

  async findAll() {
    return await this.schoolEventRepository.find();
  }

  async findOne(id: string) {
    return await this.schoolEventRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateSchoolEventDto) {
    const { label, typeEventId } = data;
    const typeEvent = await this.typeEventRepository.findOneOrFail(typeEventId);
    return await this.schoolEventRepository.update(id, { label, typeEvent });
  }

  async remove(id: string) {
    return await this.schoolEventRepository.delete(id);
  }
}
