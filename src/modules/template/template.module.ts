import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { TemplateController } from './template.controller';
import { Template } from './template.entity';
import { TemplateService } from './template.service';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([Template])],
  providers: [TemplateService],
  exports: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
