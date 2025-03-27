import { Module } from "@nestjs/common";

import { TypeOrmTasksRepositoryProvider } from "./adapters/typeorm-tasks.repository";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [UsersModule, CoreModule],
  controllers: [TasksController],
  providers: [TasksService, TypeOrmTasksRepositoryProvider],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TasksModule {}
