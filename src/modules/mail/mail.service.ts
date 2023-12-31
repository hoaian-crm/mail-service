import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Messages, Response } from 'crm-prototypes';
import { Transporter, createTransport } from 'nodemailer';
import { MailConfig } from 'src/config/mail.config';
import { DataSource, Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { TemplateService } from '../template/template.service';
import { CreateMailDto } from './dto/create.dto';
import { FindMailDto } from './dto/find.dto';
import { Mail } from './mail.entity';

@Injectable()
export class MailService {
  private mailer: Transporter;

  constructor(
    @InjectRepository(Mail) private mailRepository: Repository<Mail>,
    @InjectDataSource() private dataSource: DataSource,
    private templateService: TemplateService,
    private clientService: ClientService,
  ) {}

  async onModuleInit() {
    this.clientService.addListener<CreateMailDto>('mail', (data) => {
      this.sendMail(data);
    });
    this.createMailer();
  }

  async createMailer() {
    const plugin = await this.dataSource.query(
      "select * from plugins where plugins.enable = true and name='mail'",
    );

    if (!plugin || plugin.length === 0) {
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
      Response.badRequestThrow(Messages.notFoundTemplate);
    }
    if (data.html) {
      await this.mailer.sendMail(data);
    } else {
      data.html = await this.templateService.render(
        data.template,
        data.context,
      );
      await this.mailer.sendMail(data);
    }
    const mail = await this.mailRepository.save(data);
    return mail;
  }

  async findAndCount(query: FindMailDto) {
    return this.mailRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
    });
  }
}
