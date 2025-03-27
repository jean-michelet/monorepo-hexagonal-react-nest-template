import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppConfigModule } from "../core/config/config.module";
import { TypeOrmDatabaseModule } from "../core/adapters/type-orm";
import { TasksModule } from "../tasks/tasks.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [AppConfigModule, TypeOrmDatabaseModule, TasksModule, UsersModule],
  controllers: [AppController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
