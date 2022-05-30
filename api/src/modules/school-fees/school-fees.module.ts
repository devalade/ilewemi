import { Module } from '@nestjs/common';
import { SchoolFeesService } from './school-fees.service';
import { SchoolFeesController } from './school-fees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from '../class/entities/class.entity';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';
import { SchoolFeeEntity } from './entities/school-fee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassEntity,
      AcademicYearEntity,
      SchoolFeeEntity,
    ]),
  ],
  controllers: [SchoolFeesController],
  providers: [SchoolFeesService],
})
export class SchoolFeesModule {}
