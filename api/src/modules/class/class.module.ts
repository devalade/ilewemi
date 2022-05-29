import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
