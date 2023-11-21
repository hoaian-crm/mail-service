import { IsString } from 'class-validator';

export class MailConfig {
  @IsString()
  user: string;

  @IsString()
  mailHost: string;

  @IsString()
  mailPort: string;

  @IsString()
  password: string;
}
