import { Model } from '@src/modules/common/model.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('document')
export class DocumentEntity extends Model {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'is_published', type: 'boolean' })
  isPublished: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
