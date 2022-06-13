import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { UserEntity } from '../user/entities/user.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { TeachEntity } from '../teach/entities/teach.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassEntity,
      SubjectEntity,
      TeachEntity,
      UserEntity,
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
