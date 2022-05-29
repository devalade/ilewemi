import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ParentToStudentEntity } from './entities/parent-to-student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      UserEntity,
      ParentToStudentEntity,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
