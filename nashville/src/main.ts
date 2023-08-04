import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TrimStringPipe } from './shared/pipes/trim-string.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //add global pipe
  app.useGlobalPipes(
    new TrimStringPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
