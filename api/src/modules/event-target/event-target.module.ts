import { Module } from '@nestjs/common';
import { EventTargetService } from './event-target.service';
import { EventTargetController } from './event-target.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from '../class/entities/class.entity';
import { SchoolEventEntity } from '../school-event/entities/school-event.entity';
import { EventTargetEntity } from './entities/event-target.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassEntity,
      SchoolEventEntity,
      EventTargetEntity,
    ]),
  ],
  controllers: [EventTargetController],
  providers: [EventTargetService],
})
export class EventTargetModule {}
