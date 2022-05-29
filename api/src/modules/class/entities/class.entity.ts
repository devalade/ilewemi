import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('class')
export class ClassEntity extends Model {
  @Column()
  name: string;

  @Column()
  group: string;

  @Column({ name: 'created_by' })
  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy: string;
}
