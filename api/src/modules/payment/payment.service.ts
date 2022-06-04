import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolFeeEntity } from '../school-fees/entities/school-fee.entity';
import { StudentEntity } from '../student/entities';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(SchoolFeeEntity)
    private schoolFeeeRepository: Repository<SchoolFeeEntity>,
  ) {}
  async create(data: CreatePaymentDto) {
    const { amount, studentId, schoolFeeId, paymentMethod } = data;
    const student = await this.studentRepository.findOneOrFail(studentId);
    const schoolFee = await this.schoolFeeeRepository.findOneOrFail(
      schoolFeeId,
    );

    const res = await this.paymentRepository.insert({
      student,
      amount,
      paymentMethod,
    });
    return res;
  }

  async findAll() {
    return await this.paymentRepository.find();
  }

  async findOne(id: string) {
    return await this.paymentRepository.findOne(id);
  }

  async update(id: string, data: UpdatePaymentDto) {
    return await this.paymentRepository.update(id, {
      amount: data.amount,
    });
  }

  async remove(id: string) {
    return await this.paymentRepository.delete(id);
  }
}
