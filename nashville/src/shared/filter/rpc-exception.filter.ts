import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { GlobalMessageEnum } from '../enum/message.enum';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    let error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error.details) {
      error = JSON.parse(error.details).response;
    }


    response
      .status(error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(error || GlobalMessageEnum.SERVER_ERROR);
  }
}
