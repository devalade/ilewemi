import { Model } from '@src/modules/common/model.entity';
import { TypeEventEntity } from '@src/modules/type-event/entities/type-event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('school_event')
export class SchoolEventEntity extends Model {
  @Column()
  label: string;

  @ManyToOne(() => TypeEventEntity)
  @JoinColumn({ name: 'type_event_id' })
  typeEvent: TypeEventEntity;
}
