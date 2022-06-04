import { Module } from '@nestjs/common';
import { SchoolEventService } from './school-event.service';
import { SchoolEventController } from './school-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEventEntity } from '../type-event/entities/type-event.entity';
import { SchoolEventEntity } from './entities/school-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEventEntity, SchoolEventEntity])],
  controllers: [SchoolEventController],
  providers: [SchoolEventService],
})
export class SchoolEventModule {}
