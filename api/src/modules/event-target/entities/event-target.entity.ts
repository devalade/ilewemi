import { ClassEntity } from '@src/modules/class/entities/class.entity';
import { Model } from '@src/modules/common/model.entity';
import { SchoolEventEntity } from '@src/modules/school-event/entities/school-event.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('event_target')
export class EventTargetEntity extends Model {
  @ManyToOne(() => ClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @ManyToOne(() => SchoolEventEntity)
  @JoinColumn({ name: 'school_event_id' })
  schoolEvent: SchoolEventEntity;
}
