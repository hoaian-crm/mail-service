import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create.dto';
import { FindMailDto } from './dto/find.dto';

@Controller('/mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/')
  async create(@Body() data: CreateMailDto) {
    const mail = await this.mailService.sendMail(data);
    return {
      messages: [],
      data: {
        result: mail,
        total: 1,
      },
    };
  }

  @Get('/')
  async find(@Query() query: FindMailDto) {
    const [result, count] = await this.mailService.findAndCount(query);

    return {
      messages: [],
      data: {
        result,
        total: count,
        ...query,
      },
    };
  }
}
