import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML from 'yamljs';
import path from "path";
import { SwaggerModule } from "@nestjs/swagger";
import { createAdminUserMiddleware } from "./middleware/createAdminUserMiddleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const document = YAML.load(path.join(__dirname, '../doc/api.yaml'))
    SwaggerModule.setup('doc',app, document);
  await createAdminUserMiddleware();
  await app.listen(4000);
}
bootstrap();
