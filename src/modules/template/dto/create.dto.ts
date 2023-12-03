import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  context: object;

  @IsOptional()
  @IsString()
  description: string;
}
