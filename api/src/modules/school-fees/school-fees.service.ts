import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { CreateSchoolFeeDto, UpdateSchoolFeeDto } from './dto';
import { SchoolFeeEntity } from './entities/school-fee.entity';

@Injectable()
export class SchoolFeesService {
  constructor(
    @InjectRepository(SchoolFeeEntity)
    private schoolFeeRepository: Repository<SchoolFeeEntity>,
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
    @InjectRepository(AcademicYearEntity)
    private academicYearRepository: Repository<AcademicYearEntity>,
  ) {}
  async create(data: CreateSchoolFeeDto) {
    try {
      const { classId, academicYearId, fee } = data;
      const _class = await this.classRepository.findOneOrFail(classId);
      const academicYear = await this.academicYearRepository.findOneOrFail(
        academicYearId,
      );

      const res = await this.schoolFeeRepository.insert({
        fee,
        class: _class,
        academicYear,
      });
      return res;
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async findAll() {
    return await this.schoolFeeRepository.find();
  }

  async findOne(id: string) {
    return this.schoolFeeRepository.findOne(id);
  }

  async update(id: string, data: UpdateSchoolFeeDto) {
    return await this.schoolFeeRepository.update(id, {
      fee: data.fee,
    });
  }

  async remove(id: string) {
    return await this.schoolFeeRepository.delete(id);
  }
}
