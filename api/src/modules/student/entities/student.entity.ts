import { Model } from '@src/modules/common/model.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('student')
export class StudentEntity extends Model {
  @Column({ name: 'student_code' })
  studentCode: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;
}
