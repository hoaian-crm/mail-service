import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Handlebars from 'handlebars';
import nodeHtmlToImage from 'node-html-to-image';
import { Messages } from 'src/prototypes/formatters/messages';
import { DefaultQuery } from 'src/prototypes/formatters/query';
import { Response } from 'src/prototypes/formatters/response';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { StorageService } from '../storage/storage.service';
import { CreateTemplateDto } from './dto/create.dto';
import { Template } from './template.entity';

export type Templates = {
  [key: string]: any;
};

@Injectable()
export class TemplateService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
    private redisService: RedisService,
  ) {}

  async render(templateName: string, context: object) {
    const templateString = (await this.loadTemplate(templateName)).content;
    const template = Handlebars.compile(templateString, { noEscape: true });
    return template(context);
  }

  async loadTemplate(name: string) {
    let template: Template = await this.redisService.get(name);
    if (template) return template;
    template = await this.templateRepository.findOne({ where: { name } });
    if (!template) Response.badRequestThrow(Messages.notFoundTemplate);
    template.content = (
      await this.storageService.readFile({ filePath: template.location })
    ).content.toString();

    this.redisService.set(name, template);

    return template;
  }

  async htmlToImage(html: string) {
    const image = await nodeHtmlToImage({
      html,
      puppeteerArgs: {
        args: ['--no-sandbox']
      }
    });
    return image as Buffer;
  }

  async create(file: Express.Multer.File, data: CreateTemplateDto) {
    if (!file) Response.badRequestThrow(Messages.mustHaveFile);
    const uploadedFile = await this.storageService.upload(
      file,
      '/mail/templates/',
    );
    let previewImage = file;
    previewImage.buffer = await this.htmlToImage(file.buffer.toString());
    previewImage.originalname = data.name + ".png";
    const uploadedImage = await this.storageService.upload(
      previewImage,
      '/mail/preview_image',
    );
    const template = this.templateRepository.create({
      name: data.name,
      location: uploadedFile.url,
      context: data.context || {},
      previewImage: uploadedImage.url
    });
    await this.templateRepository.upsert(template, ['name']);
    return template;
  }

  async find(query: DefaultQuery) {
    return await this.templateRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
    });
  }
}
