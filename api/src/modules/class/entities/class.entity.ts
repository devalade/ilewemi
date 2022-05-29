import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('class')
export class ClassEntity extends Model {
  @Column()
  name: string;

  @Column()
  group: string;

  @ManyToOne(() => UserEntity, (user) => user.class)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
