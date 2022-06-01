import { Module } from '@nestjs/common';
import { EventTargetService } from './event-target.service';
import { EventTargetController } from './event-target.controller';

@Module({
  controllers: [EventTargetController],
  providers: [EventTargetService]
})
export class EventTargetModule {}
