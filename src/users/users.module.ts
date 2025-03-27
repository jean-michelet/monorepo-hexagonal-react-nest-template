import { Module } from "@nestjs/common";

import { TypeOrmUsersRepositoryProvider } from "./adapters/typeorm-users.repository";
import { USERS_REPOSITORY_TOKEN } from "./ports/users.repository.interface";

@Module({
  controllers: [],
  providers: [TypeOrmUsersRepositoryProvider],
  exports: [USERS_REPOSITORY_TOKEN],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UsersModule {}
