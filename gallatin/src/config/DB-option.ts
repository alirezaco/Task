import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DBOption: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'admin',
  password: '123456Qaz',
  database: 'STERX',
  synchronize: true,
  autoLoadEntities: true,
  // entities: ['**/*.entity{.ts,.js}'],
};
