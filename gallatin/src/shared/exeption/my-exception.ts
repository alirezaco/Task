import { RpcException } from '@nestjs/microservices';

export class MyExeption {
  constructor(error: any) {
    throw new RpcException(JSON.stringify(error));
  }
}
