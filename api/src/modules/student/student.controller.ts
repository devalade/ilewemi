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
  CreateParentToStudentDto,
  CreateStudentDto,
  UpdateStudentDto,
} from './dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() data: CreateStudentDto) {
    return this.studentService.create(data);
  }

  @Post('parent')
  addParent(@Body() data: CreateParentToStudentDto) {
    return this.studentService.addParent(data);
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
