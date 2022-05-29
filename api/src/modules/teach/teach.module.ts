import { Module } from '@nestjs/common';
import { TeachService } from './teach.service';
import { TeachController } from './teach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TeachEntity } from './entities/teach.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeachEntity,
      UserEntity,
      ClassEntity,
      SubjectEntity,
    ]),
  ],
  controllers: [TeachController],
  providers: [TeachService],
})
export class TeachModule {}
