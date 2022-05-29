import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from '../class/entities/class.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateTeachDto } from './dto/create-teach.dto';
import { UpdateTeachDto } from './dto/update-teach.dto';
import { TeachEntity } from './entities/teach.entity';

@Injectable()
export class TeachService {
  constructor(
    @InjectRepository(TeachEntity)
    private teachRepository: Repository<TeachEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async create(data: CreateTeachDto) {
    try {
      const { userId, classId, subjectId, coef } = data;
      const user = await this.userRepository.findOneOrFail(userId);
      const _class = await this.classRepository.findOne(classId);
      const subject = await this.subjectRepository.findOne(subjectId);

      const res = await this.teachRepository.insert({
        user,
        class: _class,
        subject,
        coef,
      });
      return res;
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async findAll() {
    return await this.teachRepository.find({
      loadEagerRelations: true,
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id, {
      loadEagerRelations: true,
    });
  }

  async update(id: string, data: UpdateTeachDto) {
    try {
      return await this.teachRepository.update(id, data);
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async remove(id: string) {
    return await this.teachRepository.softDelete(id);
  }
}
