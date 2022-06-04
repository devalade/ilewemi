import { Model } from '@src/modules/common/model.entity';
import { MessageEntity } from '@src/modules/message/entities/message.entity';
import { TutorEntity } from '@src/modules/student/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('receiver')
export class ReceiverEntity extends Model {
  @ManyToOne(() => TutorEntity)
  @JoinColumn({ name: 'tutor_id' })
  tutor: TutorEntity;

  @ManyToOne(() => MessageEntity)
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;

  @Column({ name: 'is_readed', default: false })
  isReaded: boolean;
}
