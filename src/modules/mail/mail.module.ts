import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { TemplateModule } from '../template/template.module';
import { MailController } from './mail.controller';
import { Mail } from './mail.entity';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mail]), TemplateModule, ClientModule],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
