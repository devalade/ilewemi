import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateParentToStudentDto } from './dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ParentToStudentEntity } from './entities/parent-to-student.entity';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentrepository: Repository<StudentEntity>,
    @InjectRepository(ParentToStudentEntity)
    private parentToStudentRepository: Repository<ParentToStudentEntity>,
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

  async addParent(data: CreateParentToStudentDto) {
    const { userId, studentId } = data;
    const student = await this.userRepository.findOneOrFail(userId);
    const user = await this.userRepository.findOneOrFail(studentId);
    const res = await this.parentToStudentRepository.insert({
      user,
      student,
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
