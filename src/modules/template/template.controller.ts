import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DefaultQuery } from 'src/prototypes/formatters/query';
import { Response } from 'src/prototypes/formatters/response';
import { CreateTemplateDto } from './dto/create.dto';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateTemplateDto,
  ) {
    const result = await this.templateService.create(file, data);
    return Response.createSuccess(result);
  }

  @Get('/')
  async find(@Query() query: DefaultQuery) {
    return Response.findSuccess(await this.templateService.find(query));
  }
}
