export class Teach {}
import { ClassEntity } from '@src/modules/class/entities/class.entity';
import { Model } from '@src/modules/common/model.entity';
import { SubjectEntity } from '@src/modules/subject/entities/subject.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('teach')
export class TeachEntity extends Model {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  @ManyToOne(() => ClassEntity)
  @JoinColumn({ name: 'class_id' })
  classId: ClassEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subjectId: SubjectEntity;

  @Column()
  coef: number;
}
