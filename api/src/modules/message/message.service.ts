import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(data: CreateMessageDto) {
    const { title, content } = data;
    const res = await this.messageRepository.insert({
      title,
      content,
    });
    return res;
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: string) {
    return await this.messageRepository.findOne(id);
  }

  async update(id: string, data: UpdateMessageDto) {
    const { title, content } = data;
    return await this.messageRepository.update(id, {
      title,
      content,
    });
  }

  async remove(id: string) {
    return await this.messageRepository.delete(id);
  }
}
