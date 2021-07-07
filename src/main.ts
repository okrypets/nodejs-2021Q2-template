import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML from 'yamljs';
import path from "path";
import { SwaggerModule } from "@nestjs/swagger";
import { createAdminUserMiddleware } from "./middleware/createAdminUserMiddleware";
import { HttpExceptionFilter } from "./middleware/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: true
  });
  const document = YAML.load(path.join(__dirname, '../doc/api.yaml'))
    SwaggerModule.setup('doc',app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  await createAdminUserMiddleware();
  await app.listen(4000);
}
bootstrap();
