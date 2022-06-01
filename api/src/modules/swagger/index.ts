import { INestApplication } from '@nestjs/common';
import { SwaggerModule, MessageBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
} from './constants';

export const setupSwagger = (app: INestApplication) => {
  const options = new MessageBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const message = SwaggerModule.createMessage(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, message);
};
