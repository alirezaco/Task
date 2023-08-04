import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  ParentId?: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(300)
  description: string;
}
