import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '@Modules/student/entities';
import { SchoolFeeEntity } from '@Modules/school-fees/entities/school-fee.entity';
import { PaymentEntity } from '@Modules/payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, StudentEntity, SchoolFeeEntity]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
