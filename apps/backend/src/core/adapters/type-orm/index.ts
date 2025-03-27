import { Global, Module } from "@nestjs/common";

import { TypeOrmSqlLiteModule } from "./typeorm-sqlite.module";
import { TypeOrmTransactionManagerProvider } from "./typeorm-transaction-manager";
import { TRANSACTION_MANAGER_TOKEN } from "../../ports/transaction-manager.interface";

@Global()
@Module({
  imports: [TypeOrmSqlLiteModule],
  providers: [TypeOrmTransactionManagerProvider],
  exports: [TRANSACTION_MANAGER_TOKEN],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TypeOrmDatabaseModule {}
