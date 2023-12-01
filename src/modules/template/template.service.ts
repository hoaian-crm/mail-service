import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import HandleBars from 'handlebars';
import { Messages } from 'src/prototypes/formatters/messages';
import { Response } from 'src/prototypes/formatters/response';
import { Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { CreateTemplateDto } from './dto/create.dto';
import { Template } from './template.entity';

export type Templates = {
  [key: string]: any;
};

@Injectable()
export class TemplateService {
  private templates: Templates = {};

  constructor(
    private storageService: StorageService,
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {
    fs.readdirSync('template').map((file) => {
      const filePath = 'template/' + file;
      const templateStr = fs.readFileSync(filePath).toString('utf-8');
      const template = HandleBars.compile(templateStr, { noEscape: true });
      this.templates[file.split('.')[0]] = template;
    });
  }

  render(templateName: string, context: object) {
    if (!this.templates[templateName]) return '';
    return this.templates[templateName](context);
  }

  async create(file: Express.Multer.File, data: CreateTemplateDto) {
    if (!file && !data.html) {
      Response.badRequestThrow(Messages.mustHaveFile);
    }
    if (!file) {
      file = {} as any;
      file.buffer = Buffer.from(data.html);
      file.originalname = data.name + '.hbs';
    }
    const uploadedFile = await this.storageService.upload(
      file,
      '/mail/templates/',
    );
    const template = this.templateRepository.create({
      name: data.name,
      location: uploadedFile.url,
      context: data.context || {},
    });
    return await this.templateRepository.save(template);
  }
}
