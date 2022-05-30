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
import { StudentModule } from './student/student.module';
import { AbsenceModule } from './absence/absence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.get('DB_TYPE'),
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: config.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions),
    }),
    UserModule,
    AuthModule,
    ClassModule,
    AcademicYearModule,
    SubjectModule,
    TeachModule,
    StudentModule,
    AbsenceModule,
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
