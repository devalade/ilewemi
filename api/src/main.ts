import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Modules/app.module';
import { setupSwagger } from '@Modules/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'auth/local/login', method: RequestMethod.POST },
      { path: 'auth/local/register', method: RequestMethod.POST },
      { path: 'auth/refresh', method: RequestMethod.POST },
      { path: 'auth/logout', method: RequestMethod.POST },
      { path: 'auth/set-password', method: RequestMethod.POST },

      { path: 'auth/verify-email-token', method: RequestMethod.GET },
    ],
  });

  await app.listen(4000);
}
bootstrap();
