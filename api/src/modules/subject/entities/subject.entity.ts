import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('subject')
export class SubjectEntity extends Model {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
