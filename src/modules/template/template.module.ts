import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'crm-storage-client';
import { RedisModule } from '../redis/redis.module';
import { TemplateController } from './template.controller';
import { Template } from './template.entity';
import { TemplateService } from './template.service';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([Template]), RedisModule],
  providers: [TemplateService],
  exports: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
