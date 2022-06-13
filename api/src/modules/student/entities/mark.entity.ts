import { Model } from '@src/modules/common/model.entity';
import { TeachEntity } from '@src/modules/teach/entities/teach.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StudentEntity } from './student.entity';

export enum TypeOfExam {
  EVALUATION = 'evaluation',
  EXAM = 'exam',
}

@Entity('mark')
export class MarkEntity extends Model {
  @Column({ name: 'obtained_mark' })
  obtainedMark: number;

  @ManyToOne(() => TeachEntity)
  @JoinColumn({ name: 'teach_id' })
  teach: TeachEntity;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;
}
