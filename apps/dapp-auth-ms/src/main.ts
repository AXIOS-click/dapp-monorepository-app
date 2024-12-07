import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './batch-telemetry';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  await tracer.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Cors
  app.enableCors();

  await app.listen(3002);
}
bootstrap();
