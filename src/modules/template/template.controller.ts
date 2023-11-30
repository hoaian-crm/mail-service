import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(
    private templateService: TemplateService,
    private storageService: StorageService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const result = await this.storageService.upload(file, 'mails/templates');

    console.log('result is: ', result);

    return result;
  }

  @Get('/health')
  async healthCheck() {
    return this.storageService.healthCheck();
  }
}
