import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import HandleBars from 'handlebars';
import { StorageService } from '../storage/storage.service';

export type Templates = {
  [key: string]: any;
};

@Injectable()
export class TemplateService {
  private templates: Templates = {};

  constructor(private storageService: StorageService) {
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
}
