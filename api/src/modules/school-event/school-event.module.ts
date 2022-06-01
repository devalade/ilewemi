import { Module } from '@nestjs/common';
import { SchoolEventService } from './school-event.service';
import { SchoolEventController } from './school-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEventEntity } from '../type-event/entities/type-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEventEntity, Sch])],
  controllers: [SchoolEventController],
  providers: [SchoolEventService],
})
export class SchoolEventModule {}
