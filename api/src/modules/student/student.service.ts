import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentrepository: Repository<StudentEntity>,
  ) {}
  async create(data: CreateStudentDto) {
    const { createdBy, studentCode, lastName, firstName } = data;
    const user = await this.userRepository.findOne(createdBy);
    const res = await this.studentrepository.insert({
      studentCode,
      lastName,
      firstName,
      createdBy: user,
    });

    return res;
  }

  async findAll() {
    return await this.studentrepository.find();
  }

  async findOne(id: string) {
    return await this.studentrepository.findOne(id);
  }

  async update(id: string, data: UpdateStudentDto) {
    try {
      const { studentCode, lastName, firstName } = data;
      return this.studentrepository.update(id, {
        studentCode,
        firstName,
        lastName,
      });
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async remove(id: string) {
    return await this.studentrepository.delete(id);
  }
}
