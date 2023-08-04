import { RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

export function handleRpcError() {
  return catchError((error) => throwError(() => new RpcException(error)));
}
