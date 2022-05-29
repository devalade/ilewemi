import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassEntity } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateClassDto) {
    try {
      const user = await this.userRepository.findOne(data.createdBy);
      delete data.createdBy;
      const _class = this.classRepository.create({ ...data, createdBy: user });
      await this.classRepository.save(_class);
      return _class;
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
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
    const _class = await this.classRepository.update(id, data as any);

    return _class;
  }

  async remove(id: string) {
    const _class = this.classRepository.delete(id);
    return _class;
  }
}
