import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { AcademicYearEntity } from './entities/academic-year.entity';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectRepository(AcademicYearEntity)
    private academicYearRepository: Repository<AcademicYearEntity>,
  ) {}

  async create(data: CreateAcademicYearDto) {
    const res = this.academicYearRepository.create(
      data as Partial<AcademicYearEntity>,
    );
    await this.academicYearRepository.save(res);
    return res;
  }

  findAll() {
    return `This action returns all academicYear`;
  }

  findOne(id: string) {
    return `This action returns a #${id} academicYear`;
  }

  update(id: string, data: UpdateAcademicYearDto) {
    return `This action updates a #${id} academicYear`;
  }

  remove(id: string) {
    return `This action removes a #${id} academicYear`;
  }
}
