import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  ParentId?: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(300)
  description: string;
}
