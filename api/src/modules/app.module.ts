import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        ({
          type: 'postgres',
          host: '0.0.0.0',
          port: 5430,
          username: 'devalade',
          password: 'XmD@QCJCNaJ4Rv',
          database: 'ilewemi',
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleAsyncOptions),
    }),
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
