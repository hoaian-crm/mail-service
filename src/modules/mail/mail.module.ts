import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './mail.entity';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TemplateModule } from '../template/template.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mail]), TemplateModule],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
