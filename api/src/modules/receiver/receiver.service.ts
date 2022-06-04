import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../message/entities/message.entity';
import { TutorEntity } from '../student/entities';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { ReceiverEntity } from './entities/receiver.entity';

@Injectable()
export class ReceiverService {
  constructor(
    @InjectRepository(ReceiverEntity)
    private receiverRepository: Repository<ReceiverEntity>,
    @InjectRepository(TutorEntity)
    private tutorRepository: Repository<TutorEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async create(data: CreateReceiverDto) {
    const { tutorId, messageId } = data;
    const tutor = await this.tutorRepository.findOneOrFail(tutorId);
    const message = await this.messageRepository.findOneOrFail(messageId);

    return await this.receiverRepository.insert({
      tutor,
      message,
    });
  }

  async findAll() {
    return await this.receiverRepository.find();
  }

  async findOne(id: string) {
    return await this.receiverRepository.findOne(id);
  }

  async update(id: string, data: UpdateReceiverDto) {
    const { isReaded } = data;
    return await this.receiverRepository.update(id, {
      isReaded,
    });
  }

  async remove(id: string) {
    return await this.receiverRepository.delete(id);
  }
}
