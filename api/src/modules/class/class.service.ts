import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In } from 'typeorm';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { TeachEntity } from '../teach/entities/teach.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassEntity } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TeachEntity)
    private teachRepository: Repository<TeachEntity>,
  ) {}

  async create(data: CreateClassDto) {
    const { name, group, subjects } = data;
    const _class = await this.classRepository.save({ name, group });
    const res = await this.subjectRepository.find({
      where: {
        id: In(subjects),
      },
    });
    const teach = await this.teachRepository.save(
      res.map((subject) => ({ class: _class, subject })),
    );

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
    const _class = await this.classRepository.update(id, data as any);

    return _class;
  }

  async remove(id: string) {
    const _class = this.classRepository.delete(id);
    return _class;
  }
}
