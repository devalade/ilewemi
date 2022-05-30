import { Model } from '@src/modules/common/model.entity';
import { SchoolFeeEntity } from '@src/modules/school-fees/entities/school-fee.entity';
import { StudentEntity } from '@src/modules/student/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum PaymentMethod {
  CASH = 'cash',
  MOBILE_MONEY = 'mobile_money',
}

@Entity('payment')
export class PaymentEntity extends Model {
  @Column('int')
  amount: number;

  @ManyToOne(() => SchoolFeeEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => SchoolFeeEntity)
  @JoinColumn({ name: 'school_fees_id' })
  schoolFee: SchoolFeeEntity;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: PaymentMethod;
}
