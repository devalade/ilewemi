import { Module } from '@nestjs/common';
import { AttendService } from './attend.service';
import { AttendController } from './attend.controller';

@Module({
  controllers: [AttendController],
  providers: [AttendService]
})
export class AttendModule {}
