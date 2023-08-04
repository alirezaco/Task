import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FilterFieldsPipe } from './shared/pipes/filter-fields.pipe';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './shared/exeption/validation-exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'task',
        protoPath: join(__dirname, './task/task.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (error) => {
        new ValidationException(error);
      },
    }),
    new FilterFieldsPipe(),
  );
  await app.listen();
}
bootstrap();
