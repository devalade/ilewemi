import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { IsNull, Not, QueryFailedError, Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { SetPassordDto } from './dto/set-password.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async registerLocal(dto: RegisterDto): Promise<Tokens> {
    const newUser = this.userRepository.create({
      email: dto.email,
      password: dto.password,
      lastName: dto.lastName,
      firstName: dto.firstName,
    });
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError && error['code'] == 23505) {
        throw new ConflictException('Email already exist');
      }
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateResfreshTokenHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async loginLocal(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await user.comparePassword(dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateResfreshTokenHash(user.id, tokens.refresh_token);
    return { user, tokens };
  }
  async logout(userId: string) {
    await this.userRepository.update(
      { id: userId, refreshTokenHash: Not(IsNull()) },
      { refreshTokenHash: null },
    );
  }
  async verifyEmailToken(token: string) {
    try {
      // TODO: check if the token is still valid
      const user = await this.userRepository.find({
        where: {
          refreshTokenHash: token,
        },
      });
      if (user.length !== 1) return { isValid: false };

      return { isValid: true };
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  async setPassword(data: SetPassordDto, token: string) {
    const { password } = data;
    const user = await this.userRepository.find({
      where: {
        refreshTokenHash: token,
      },
    });

    if (user.length !== 1) throw new ForbiddenException('Access Denied');

    user[0].password = await argon2.hash(password);

    return await this.userRepository.save(user[0]);
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshTokenHash)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = user.compareRefreshTokenshash(refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateResfreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [acessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('ACCESS_TOKENS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('REFRESH_TOKENS_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      refresh_token: refreshToken,
      access_token: acessToken,
    };
  }

  async updateResfreshTokenHash(userId: string, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);

    await this.userRepository.update(
      { id: userId },
      { refreshTokenHash: hash },
    );
    // await this.userRepository.save();
  }
}
