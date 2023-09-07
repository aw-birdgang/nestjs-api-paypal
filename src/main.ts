import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./common/swagger";
import {ConfigService} from "./config";
// import {ConfigService} from "@app/config";
// import {setupSwagger} from "@app/common/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors();
  setupSwagger(app);

  const env = configService.get('APP_ENV');
  const port = configService.get('APP_PORT');
  await app.listen(port);
  console.info(`Server listening on port ${port}`);
}
bootstrap();
