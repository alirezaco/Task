import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isEnum } from 'class-validator';
import { BaseFilter } from '../dto/base-filter.dto';

@Injectable()
export class SortPipe implements PipeTransform {
  constructor(public allowFiels: any) {}

  transform(value: BaseFilter) {
    for (const e of value.sort) {
      if (!isEnum(e.field, this.allowFiels)) {
        throw new BadRequestException(
          "error"
        );
      }
    }

    return value;
  }
}
