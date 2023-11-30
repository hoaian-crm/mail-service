import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  providers: [TemplateService],
  exports: [TemplateService],
  controllers: [TemplateController],
  imports: [StorageModule],
})
export class TemplateModule {}
