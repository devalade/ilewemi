import { Module } from '@nestjs/common';
import { TypeEventService } from './type-event.service';
import { TypeEventController } from './type-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEventEntity } from './entities/type-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEventEntity])],
  controllers: [TypeEventController],
  providers: [TypeEventService],
})
export class TypeEventModule {}
