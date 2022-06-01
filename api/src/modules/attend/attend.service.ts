import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { StudentEntity } from '../student/entities';
import { CreateAttendDto, UpdateAttendDto } from './dto';
import { AttendEntity } from './entities/attend.entity';

@Injectable()
export class AttendService {
  constructor(
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,

    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,

    @InjectRepository(AcademicYearEntity)
    private academicYearEntity: Repository<AcademicYearEntity>,

    @InjectRepository(AttendEntity)
    private attendRepository: Repository<AttendEntity>,
  ) {}

  async create(data: CreateAttendDto) {
    const { classId, studentId, academicYearId } = data;
    const _class = await this.classRepository.findOneOrFail(classId);
    const student = await this.studentRepository.findOneOrFail(studentId);
    const academicYear = await this.academicYearEntity.findOneOrFail(
      academicYearId,
    );

    return await this.attendRepository.insert({
      class: _class,
      student,
      academicYear,
    });
  }

  async findAll() {
    return await this.attendRepository.find();
  }

  async findOne(id: string) {
    return await this.attendRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateAttendDto) {
    const _class = await this.classRepository.findOneOrFail(id);
    return await this.attendRepository.update(id, {
      class: _class,
    });
  }

  async remove(id: string) {
    return await this.attendRepository.delete(id);
  }
}
