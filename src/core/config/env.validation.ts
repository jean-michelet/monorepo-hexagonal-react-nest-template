import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, validateSync } from "class-validator";

export enum Environment {
  TEST = "test",
  LOCAL = "local",
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  ENVIRONMENT!: Environment;

  @IsOptional()
  @IsNumber()
  PORT?: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.map((e) => e.toString()).join(", "));
  }

  return validatedConfig;
}
