import { AcademicYearEntity } from '@src/modules/academic-year/entities/academic-year.entity';
import { ClassEntity } from '@src/modules/class/entities/class.entity';
import { Model } from '@src/modules/common/model.entity';
import { StudentEntity } from '@src/modules/student/entities';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('attend')
export class AttendEntity extends Model {
  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => ClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'aacdemic_year_id' })
  academicYear: AcademicYearEntity;
}
