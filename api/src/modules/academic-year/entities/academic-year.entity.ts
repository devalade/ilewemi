import { Model } from '@src/modules/common/model.entity';
import { Column, Entity } from 'typeorm';

@Entity('academic_year')
export class AcademicYearEntity extends Model {
  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;
}
