import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BaseFilter, BaseFilterFields } from '../dto/base-filter.dto';
import { In, Like } from 'typeorm';

@Injectable()
export class FilterFieldsPipe implements PipeTransform {
  transform(
    value: BaseFilter & { filter: BaseFilterFields },
    metadata: ArgumentMetadata,
  ) {
    if (value?.filter && metadata.type === 'body') {
      let filterRequest = {};
      let filterItem = {};

      filterRequest['sort'] = value.sort;
      filterRequest['pagination'] = value.pagination;

      for (const item in value.filter) {
        if (typeof value.filter[item] == 'string') {
          filterItem[`${item}`] = Like(`%${value.filter[item]}%`);
        } else if (Array.isArray(value.filter[item])) {
          filterItem[`${item}`] = In(value.filter[item]);
        } else {
          filterItem[`${item}`] = value.filter[`${item}`];
        }
      }
      filterRequest['filter'] = filterItem;
      return filterRequest;
    }

    return value;
  }
}
