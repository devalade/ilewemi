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
    return await this.academicYearRepository.save(data);
  }

  async findAll() {
    const res = this.academicYearRepository.find();
    return res;
  }

  async findOne(id: string) {
    const res = await this.academicYearRepository.findOne(id);
    return res;
  }

  async update(id: string, data: UpdateAcademicYearDto) {
    const res = await this.academicYearRepository.update(id, data);
    return res;
  }

  remove(id: string) {
    const res = this.academicYearRepository.delete(id);
    return res;
  }
}
