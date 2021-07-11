import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML from 'yamljs';
import path from "path";
import { SwaggerModule } from "@nestjs/swagger";
import { createAdminUserMiddleware } from "./middleware/createAdminUserMiddleware";
import { HttpExceptionFilter } from "./middleware/http-exception.filter";
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import envData from "./common/config"

async function bootstrap() {
  const app = (!Boolean(envData.USE_FASTIFY) || envData.USE_FASTIFY === "false") ? 
  await NestFactory.create(AppModule, { 
    cors: true
  })
  : 
  await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const document = YAML.load(path.join(__dirname, '../doc/api.yaml'))
    SwaggerModule.setup('doc',app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  await createAdminUserMiddleware();
  await app.listen(4000, () => console.log("App is running on 'http://localhost:4000/'"));
}
bootstrap();
