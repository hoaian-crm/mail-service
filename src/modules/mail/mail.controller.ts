import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create.dto';

@Controller('/mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/')
  async create(@Body() data: CreateMailDto) {
    return this.mailService.sendMail(data);
  }
}
