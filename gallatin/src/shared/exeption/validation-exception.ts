import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MyExeption } from './my-exception';

export class ValidationException {
  private message: Array<string> = [];

  constructor(errors: ValidationError[]) {
    for (const error of errors) {
      console.log(error);
      
      if (error.constraints) {
        this.message.push(...Object.values(error.constraints));
      }
    }

    throw new MyExeption(new BadRequestException(this.message));
  }
}
