import { Model } from '@src/modules/common/model.entity';
import { DocumentEntity } from '@src/modules/document/entities/document.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum OPERATION_STATUS {
  succes = 'SUCCES',
  pending = 'PENDING',
  failed = 'FAILED',
}

@Entity('schedule_event')
export class ScheduleEventEntity extends Model {
  @Column({
    name: 'operation_status',
    enum: OPERATION_STATUS,
    default: OPERATION_STATUS.pending,
  })
  operationStatus: OPERATION_STATUS;

  @Column({ name: 'publishing_date', type: 'timestamp' })
  publishingDate: Date;

  @ManyToOne(() => DocumentEntity)
  @JoinColumn({ name: 'docuement_id' })
  document: DocumentEntity;
}
