import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
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
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  ParentId: string;
}

export class FilterTaskDto extends BaseFilter {
  @IsObject()
  @IsNotEmptyObject({ nullable: false })
  @ValidateNested()
  @Type(() => FilterFields)
  filter: FilterFields;
}
