import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { BaseFilter, BaseFilterFields } from 'src/shared/dto/base-filter.dto';

class FilterFields extends BaseFilterFields {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-f\d]{24}$/i)
  ParentId: string;
}

export class FilterTaskDto extends BaseFilter {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FilterFields)
  filter: FilterFields;
}
