import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMailDto {
  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  html: string;

  @IsString()
  @IsOptional()
  template: string;

  @IsObject()
  @IsOptional()
  context: object;
}
