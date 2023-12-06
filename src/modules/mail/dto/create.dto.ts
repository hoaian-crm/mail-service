import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
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
