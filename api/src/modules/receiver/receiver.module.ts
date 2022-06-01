import { Module } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { ReceiverController } from './receiver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiverEntity } from './entities/receiver.entity';
import { StudentEntity, TutorEntity } from '../student/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiverEntity, TutorEntity, StudentEntity]),
  ],
  controllers: [ReceiverController],
  providers: [ReceiverService],
})
export class ReceiverModule {}
