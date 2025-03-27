import { AppConfigService } from "./core/config/config.service";
import { createApp } from "./createApp";

async function bootstrap() {
  const app = await createApp();

  const config = app.get(AppConfigService);

  await app.listen(config.port);
}

void bootstrap();
