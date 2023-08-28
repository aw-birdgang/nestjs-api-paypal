import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from 'src/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);
  const version = configService.get('APP_VERSION');
  const env = configService.get('APP_ENV');

  const options = new DocumentBuilder()
    .setTitle(env == 'production' ? 'PROD API Docs' : 'DEV API Docs')
    .setDescription(env == 'production' ? 'PROD API description' : 'DEV API description')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
