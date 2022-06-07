import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserCreatedEvent } from '../events/user-created.event';
import { MailService } from '../mail/mail.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly eventEmitter: EventEmitter2,
    private mailService: MailService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  private readonly logger = new Logger(UserEntity.name);

  async create(data: CreateUserDto) {
    const token: string = await this.getTokens(data.email);
    const newUser = this.userRepository.create({
      email: data.email,
      phoneNumber: data.phoneNumber,
      lastName: data.lastName,
      firstName: data.firstName,
      role: data.role,
      refreshTokenHash: token,
    });

    try {
      const res = await this.userRepository.save(newUser);
      this.eventEmitter.emit(
        'user.created',
        new UserCreatedEvent(
          res.id,
          res.email,
          res.lastName,
          res.firstName,
          token,
        ),
      );
      this.logger.log('Email has been sent successfully..');
      return res;
    } catch (error) {
      if (error instanceof QueryFailedError && error['code'] == 23505) {
        throw new ConflictException('Email or phone number already exist');
      }
      throw new ForbiddenException(error);
    }
  }

  async findAll(roles: string) {
    if (!roles) {
      return await this.userRepository.find();
    }
    return await this.userRepository.find({
      where: roles.split(',').map((value) => ({
        role: value,
      })),
      order: {
        createdAt: 'DESC',
      },
      take: 5,
    });
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

  @OnEvent('user.created', { async: true })
  async sendEmailForSettingPassword(payload: UserCreatedEvent) {
    this.logger.log('Welcome new user...', payload.email);
    await this.mailService.sendUserConfirmation(payload, payload.token);
  }

  async getTokens(email: string) {
    const token = await this.jwtService.signAsync(
      { sub: email },
      {
        secret: this.config.get<string>('ACCESS_TOKENS_SECRET'),
        expiresIn: '2d',
      },
    );
    return token;
  }
}
