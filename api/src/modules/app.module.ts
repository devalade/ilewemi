import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from '@Modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@Modules/common/decorators/guards';
import { ClassModule } from './class/class.module';
import { AcademicYearModule } from './academic-year/academic-year.module';
import { SubjectModule } from './subject/subject.module';
import { TeachModule } from './teach/teach.module';
import config from '../../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    ClassModule,
    AcademicYearModule,
    SubjectModule,
    TeachModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection, private config: ConfigService) {}
}
