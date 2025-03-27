import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { Environment, EnvironmentVariables } from "./env.validation";

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  public get environment(): Environment {
    return this.configService.get<Environment>("ENVIRONMENT");
  }

  public get port() {
    return this.configService.get<number | undefined>("PORT") ?? 8000;
  }
}
