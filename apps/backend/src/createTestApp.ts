import { AppModule } from "./app/app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { configureApp } from "./createApp";
import { Test, TestingModule } from "@nestjs/testing";
import { FixturesModule } from "./fixtures/fixtures.module";

export async function createTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, FixturesModule],
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  configureApp(app);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
}
