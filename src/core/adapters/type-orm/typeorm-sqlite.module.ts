import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskEntity } from "./entities/task.entity";
import { UserEntity } from "./entities/user.entity";

export const TypeOrmSqlLiteModule = TypeOrmModule.forRoot({
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  entities: [TaskEntity, UserEntity],
  synchronize: true,
});
