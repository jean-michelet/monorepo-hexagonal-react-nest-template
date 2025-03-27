import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";

export function configureApp(app: NestFastifyApplication) {
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
}

export async function createApp() {
  // @ts-ignore
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  configureApp(app);

  return app;
}
