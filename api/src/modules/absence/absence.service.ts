import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';
import { StudentEntity } from '../student/entities';
import { UserEntity } from '../user/entities/user.entity';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { AbsenceEntity } from './entities/absence.entity';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(AcademicYearEntity)
    private academicYearRepository: Repository<AcademicYearEntity>,
    @InjectRepository(AbsenceEntity)
    private absenceRepository: Repository<AbsenceEntity>,
  ) {}
  async create(data: CreateAbsenceDto) {
    try {
      const {
        academicYearId,
        studentId,
        createdBy,
        description,
        startDate,
        endDate,
      } = data;
      const student = await this.studentRepository.findOneOrFail(studentId);
      const user = await this.userRepository.findOneOrFail(createdBy);
      const academicYear = await this.academicYearRepository.findOneOrFail(
        academicYearId,
      );

      const res = await this.absenceRepository.insert({
        description,
        student,
        createdBy: user,
        academicYear,
        startDate,
        endDate,
      });
      return res;
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async findAll() {
    return await this.absenceRepository.find();
  }

  async findOne(id: string) {
    return await this.absenceRepository.findOne(id);
  }

  async update(id: string, data: UpdateAbsenceDto) {
    const res = await this.absenceRepository.update(id, {
      startDate: data.startDate,
      endDate: data.endDate,
    });
    return res;
  }

  async remove(id: string) {
    return await this.absenceRepository.delete(id);
  }
}
