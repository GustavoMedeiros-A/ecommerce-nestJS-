import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registers pipes as global pipes (will be used within every HTTP route handler)
  // Use for Sanitizing
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
