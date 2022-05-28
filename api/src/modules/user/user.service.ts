import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.userRepository.create(data as Partial<UserEntity>);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByRole(role: string) {
    return this.userRepository.find({
      where: {
        role,
      },
    });
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.userRepository.update(
      id,
      data as Partial<UserEntity>,
    );
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    return user;
  }
}
