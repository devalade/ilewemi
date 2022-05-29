import { Injectable } from '@nestjs/common';
import { CreateTeachDto } from './dto/create-teach.dto';
import { UpdateTeachDto } from './dto/update-teach.dto';

@Injectable()
export class TeachService {
  create(createTeachDto: CreateTeachDto) {
    return 'This action adds a new teach';
  }

  findAll() {
    return `This action returns all teach`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teach`;
  }

  update(id: number, updateTeachDto: UpdateTeachDto) {
    return `This action updates a #${id} teach`;
  }

  remove(id: number) {
    return `This action removes a #${id} teach`;
  }
}
