import { Module } from '@nestjs/common';
import { ScheduleEventService } from './schedule-event.service';
import { ScheduleEventController } from './schedule-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEventEntity } from './entities/schedule-event.entity';
import { MessageEntity } from '../message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEventEntity, MessageEntity])],
  controllers: [ScheduleEventController],
  providers: [ScheduleEventService],
})
export class ScheduleEventModule {}
