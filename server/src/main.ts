import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigSchema } from 'core/config/app.schema';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService<ApplicationConfigSchema>();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NPS от REON')
    .setDescription('Описание API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();
