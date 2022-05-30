import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AcademicYearEntity } from '../academic-year/entities/academic-year.entity';
import { StudentEntity } from '../student/entities';
import { AbsenceEntity } from './entities/absence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AcademicYearEntity,
      StudentEntity,
      AbsenceEntity,
    ]),
  ],
  controllers: [AbsenceController],
  providers: [AbsenceService],
})
export class AbsenceModule {}
