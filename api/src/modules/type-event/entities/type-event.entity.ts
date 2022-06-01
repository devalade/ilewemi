import { Model } from '@src/modules/common/model.entity';
import { Column, Entity } from 'typeorm';

@Entity('type_event')
export class TypeEventEntity extends Model {
  @Column()
  label: string;
}
