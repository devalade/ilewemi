import { Module } from '@nestjs/common';
import { AttendService } from './attend.service';
import { AttendController } from './attend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendEntity } from './entities/attend.entity';
import { StudentEntity } from '../student/entities';
import { ClassEntity } from '../class/entities/class.entity';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendEntity,
      StudentEntity,
      ClassEntity,
      AcademicYearEntity,
    ]),
  ],
  controllers: [AttendController],
  providers: [AttendService],
})
export class AttendModule {}
