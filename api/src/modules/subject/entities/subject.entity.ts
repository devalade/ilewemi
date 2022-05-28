import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class SubjectEntity extends Model {
  @Column()
  name: string;

  @Column({ name: 'created_by' })
  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy: string;
}
