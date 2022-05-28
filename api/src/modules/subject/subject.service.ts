import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { SubjectEntity } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async create(data: CreateSubjectDto) {
    const res = this.subjectRepository.create(data as Partial<SubjectEntity>);
    await this.subjectRepository.save(res);
    return res;
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
    const res = await this.subjectRepository.update(id, data);
    return res;
  }

  remove(id: string) {
    const res = this.subjectRepository.delete(id);
    return res;
  }
}
