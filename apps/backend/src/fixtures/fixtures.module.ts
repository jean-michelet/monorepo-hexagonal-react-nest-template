import { Module } from "@nestjs/common";
import { TasksModule } from "../tasks/tasks.module";
import { UsersModule } from "../users/users.module";
import { TypeOrmFixturesLoaderProvider } from "./adapters/typeorm-fixtures.loader";

@Module({
  imports: [UsersModule, TasksModule],
  providers: [TypeOrmFixturesLoaderProvider],
  exports: [TypeOrmFixturesLoaderProvider],
})
export class FixturesModule {}
