export class Teach {}
import { ClassEntity } from '@src/modules/class/entities/class.entity';
import { Model } from '@src/modules/common/model.entity';
import { SubjectEntity } from '@src/modules/subject/entities/subject.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('teach')
export class TeachEntity extends Model {
  // @ManyToOne(() => UserEntity)
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;

  @ManyToOne(() => ClassEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @ManyToOne(() => SubjectEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @Column({ nullable: true, type: 'int' })
  coef: number;
}
