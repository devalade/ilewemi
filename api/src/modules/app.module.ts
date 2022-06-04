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
import { SchoolFeesModule } from './school-fees/school-fees.module';
import { PaymentModule } from './payment/payment.module';
import { MessageModule } from './message/message.module';
import { ScheduleEventModule } from './schedule-event/schedule-event.module';
import { AttendModule } from './attend/attend.module';
import { ReceiverModule } from './receiver/receiver.module';
import { SchoolEventModule } from './school-event/school-event.module';
import { TypeEventModule } from './type-event/type-event.module';
import { EventTargetModule } from './event-target/event-target.module';

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
    SchoolFeesModule,
    PaymentModule,
    MessageModule,
    ScheduleEventModule,
    AttendModule,
    ReceiverModule,
    SchoolEventModule,
    TypeEventModule,
    EventTargetModule,
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
