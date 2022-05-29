import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { SubjectEntity } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateSubjectDto) {
    try {
      const { name, createdBy } = data;
      const user = await this.userRepository.findOne(createdBy);
      const res = this.subjectRepository.create({ name, createdBy: user });
      await this.subjectRepository.save(res);
      return res;
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async findAll() {
    const res = await this.subjectRepository.find();
    return res;
  }

  async findOne(id: string) {
    const res = await this.subjectRepository.findOne(id);
    return res;
  }

  async update(id: string, data: UpdateSubjectDto) {
    const { name, createdBy } = data;
    const user = await this.userRepository.findOne(createdBy);
    const res = await this.subjectRepository.update(id, {
      name,
      createdBy: user,
    });
    return res;
  }

  remove(id: string) {
    const res = this.subjectRepository.delete(id);
    return res;
  }
}
