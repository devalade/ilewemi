import { StudentService } from './student.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateMarkDto,
  CreateTutorDto,
  CreateStudentDto,
  UpdateStudentDto,
  UpdateMarkDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() data: CreateStudentDto) {
    return this.studentService.create(data);
  }

  @Post('parent')
  addParent(@Body() data: CreateTutorDto) {
    return this.studentService.addParent(data);
  }

  @Post('mark')
  addMark(@Body() data: CreateMarkDto) {
    return this.studentService.addMark(data);
  }

  @Patch(':student_id/mark/:mark_id')
  updateMark(
    @Param('student_id') student_id: string,
    @Param('mark_id') mark_id: string,

    @Body() data: UpdateMarkDto,
  ) {
    return this.studentService.updateMark(student_id, mark_id, data);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    return this.studentService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
