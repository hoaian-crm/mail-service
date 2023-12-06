import { NestFactory } from '@nestjs/core';
import { configLogger } from 'crm-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validation = await configLogger();

  app.useGlobalPipes(validation);

  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
