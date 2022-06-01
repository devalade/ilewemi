import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachEntity } from '../teach/entities/teach.entity';
import { UserEntity } from '../user/entities/user.entity';
import {
  CreateStudentDto,
  UpdateMarkDto,
  CreateMarkDto,
  CreateTutorDto,
} from './dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity, TutorEntity, MarkEntity } from './entities';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentrepository: Repository<StudentEntity>,
    @InjectRepository(TutorEntity)
    private tutorRepository: Repository<TutorEntity>,
    @InjectRepository(MarkEntity)
    private markRepository: Repository<MarkEntity>,
    @InjectRepository(TeachEntity)
    private teachRepository: Repository<TeachEntity>,
  ) {}
  async create(data: CreateStudentDto) {
    const { studentCode, lastName, firstName } = data;
    const res = await this.studentrepository.insert({
      studentCode,
      lastName,
      firstName,
    });

    return res;
  }

  async addParent(data: CreateTutorDto) {
    const { userId, studentId } = data;
    const student = await this.userRepository.findOneOrFail(userId);
    const user = await this.userRepository.findOneOrFail(studentId);
    const res = await this.tutorRepository.insert({
      user,
      student,
    });
    return res;
  }

  async addMark(data: CreateMarkDto) {
    const { studentId, teachId, typeOfExam, createdBy, obtainedMark } = data;
    const student = await this.studentrepository.findOneOrFail(studentId);
    const teach = await this.studentrepository.findOneOrFail(teachId);
    const _createdBy = await this.userRepository.findOneOrFail(createdBy);
    return await this.markRepository.insert({
      student,
      teach,
      createdBy: _createdBy,
      obtainedMark,
      typeOfExam,
    });
  }

  async updateMark(student_id: string, mark_id: string, data: UpdateMarkDto) {
    const { typeOfExam, obtainedMark } = data;
    return await this.markRepository.update(mark_id, {
      obtainedMark,
      typeOfExam,
    });
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
