import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  html: string;

  @IsOptional()
  @IsObject()
  context: object;
}
