import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBOption } from './config/DB-option';

@Module({
  imports: [
    TypeOrmModule.forRoot(DBOption),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
