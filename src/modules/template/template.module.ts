import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisDb, RedisModule } from 'crm-redis-client';
import { StorageModule } from 'crm-storage-client';
import { TemplateController } from './template.controller';
import { Template } from './template.entity';
import { TemplateService } from './template.service';

@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([Template]),
    RedisModule.register({ database: RedisDb.Mail }),
  ],
  providers: [TemplateService],
  exports: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
