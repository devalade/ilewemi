import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ReceiverEntity } from '../receiver/entities/receiver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity, ReceiverEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
