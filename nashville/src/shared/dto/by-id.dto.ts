import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ByIdDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  id: string;
}
