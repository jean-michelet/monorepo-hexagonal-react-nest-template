import { Module } from "@nestjs/common";

import { TypeOrmUsersRepositoryProvider } from "./adapters/typeorm-users.repository";
import { USERS_REPOSITORY_TOKEN } from "./ports/users.repository.interface";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [TypeOrmUsersRepositoryProvider, UsersService],
  exports: [USERS_REPOSITORY_TOKEN],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UsersModule {}
