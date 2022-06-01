import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TutorEntity } from './entities/tutor.entity';
import { MarkEntity } from './entities/mark.entity';
import { TeachEntity } from '../teach/entities/teach.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      UserEntity,
      TutorEntity,
      MarkEntity,
      TeachEntity,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
