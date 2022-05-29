import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('student')
export class StudentEntity extends Model {
  @Column({ name: 'student_code' })
  studentCode: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
