import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity('message')
export class MessageEntity extends Model {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'is_readed', type: 'boolean', default: false })
  isReaded: boolean;
}
