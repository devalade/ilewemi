import { AcademicYearEntity } from '@src/modules/academic-year/entities/academic-year.entity';
import { ClassEntity } from '@src/modules/class/entities/class.entity';
import { Model } from '@src/modules/common/model.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('school_fees')
export class SchoolFeeEntity extends Model {
  @Column('bigint')
  fee: number;

  @ManyToOne(() => ClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @ManyToOne(() => AcademicYearEntity)
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYearEntity;
}
