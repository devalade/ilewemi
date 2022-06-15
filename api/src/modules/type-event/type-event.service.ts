import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeEventDto } from './dto/create-type-event.dto';
import { UpdateTypeEventDto } from './dto/update-type-event.dto';
import { TypeEventEntity } from './entities/type-event.entity';

@Injectable()
export class TypeEventService {
  constructor(
    @InjectRepository(TypeEventEntity)
    private typeEventRepository: Repository<TypeEventEntity>,
  ) {}

  async create(data: CreateTypeEventDto) {
    const { label } = data;
    return await this.typeEventRepository.save({ label });
  }

  async findAll() {
    return await this.typeEventRepository.find();
  }

  async findOne(id: string) {
    return await this.typeEventRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateTypeEventDto) {
    return await this.typeEventRepository.update(id, data);
  }

  async remove(id: string) {
    return await this.typeEventRepository.delete(id);
  }
}
