import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, Public } from '@Modules/common/decorators';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from '@Modules/common/decorators/guards';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() data: RegisterDto): Promise<Tokens> {
    return this.authService.registerLocal(data);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto): Promise<Tokens> {
    return this.authService.loginLocal(data);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: string) {
    console.log(userId);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
