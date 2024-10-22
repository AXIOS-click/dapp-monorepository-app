import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  RABBITMQ_URL: Joi.string().uri().required(),
});

export const EnvConfigProvider = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema,
  envFilePath: '.env',
});
