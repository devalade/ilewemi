import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassEntity } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
  ) {}
  async create(data: CreateClassDto) {
    const _class = this.classRepository.create(data as Partial<ClassEntity>);
    await this.classRepository.save(_class);
    return _class;
  }

  async findAll() {
    const _class = await this.classRepository.find();
    return _class;
  }

  async findOne(id: string) {
    const _class = await this.classRepository.findOne(id);
    return _class;
  }

  async update(id: string, data: UpdateClassDto) {
    const _class = await this.classRepository.update(
      id,
      data as Partial<ClassEntity>,
    );

    return _class;
  }

  async remove(id: string) {
    const _class = this.classRepository.delete(id);
    return _class;
  }
}
