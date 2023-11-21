import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Mail } from './mail.entity';
import { MailConfig } from 'src/config/mail.config';
import { Transporter, createTransport } from 'nodemailer';
import { CreateMailDto } from './dto/create.dto';
import { TemplateService } from '../template/template.service';

@Injectable()
export class MailService {
  private mailer: Transporter;

  constructor(
    @InjectRepository(Mail) private mailRepository: Repository<Mail>,
    @InjectDataSource() private dataSource: DataSource,
    private templateService: TemplateService,
  ) {
    this.createMailer();
  }

  async createMailer() {
    const plugin = await this.dataSource.query(
      "select * from plugins where plugins.enable = true and name='mailer'",
    );
    if (!plugin) {
      throw new Error('Please enable mail service to use');
    }

    const config: MailConfig = plugin[0].config;
    this.mailer = createTransport({
      host: config.mailHost,
      port: +config.mailPort,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  async sendMail(data: CreateMailDto) {
    if (!data.html && !data.template) {
      throw new BadRequestException('Html or template must be specify');
    }
    if (data.html) {
      await this.mailer.sendMail(data);
    } else {
      data.html = this.templateService.render(data.template, data.context);
      await this.mailer.sendMail(data);
    }
    const mail = await this.mailRepository.save(data);
    return mail;
  }
}
