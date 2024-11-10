import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './batch-telemetry';

async function bootstrap() {
  await tracer.start();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
