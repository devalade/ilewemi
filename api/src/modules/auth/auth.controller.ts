import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, Public } from '@Modules/common/decorators';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from '@Modules/common/decorators/guards';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SetPassordDto } from './dto/set-password.input';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @Post('local/register')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  register(@Body() data: RegisterDto): Promise<Tokens> {
    return this.authService.registerLocal(data);
  }

  @Public()
  @Post('local/login')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginDto,
  ): Promise<{ user: UserEntity; tokens: Tokens }> {
    return this.authService.loginLocal(data);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('/set-password')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  setPassword(@Body() data: SetPassordDto, @Query('token') token: string) {
    return this.authService.setPassword(data, token);
  }

  @Public()
  @Get('/verify-email-token')
  @HttpCode(HttpStatus.OK)
  verifyEmailToken(@Query('token') token: string) {
    return this.authService.verifyEmailToken(token);
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
