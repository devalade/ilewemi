import { Module } from '@nestjs/common';
import { TeachService } from './teach.service';
import { TeachController } from './teach.controller';

@Module({
  controllers: [TeachController],
  providers: [TeachService]
})
export class TeachModule {}
