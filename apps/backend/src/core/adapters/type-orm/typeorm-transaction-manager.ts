import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

import {
  ITransaction,
  TRANSACTION_MANAGER_TOKEN,
  type ITransactionManager,
} from "../../ports/transaction-manager.interface";

@Injectable()
export class TypeOrmTransactionManager implements ITransactionManager {
  constructor(private readonly entityManager: EntityManager) {}

  async transaction<T>(
    callback: (tx: ITransaction) => Promise<T>,
  ): Promise<T> {
    return await this.entityManager.transaction(callback);
  }
}

// eslint-disable-next-line id-length
export const TypeOrmTransactionManagerProvider = {
  provide: TRANSACTION_MANAGER_TOKEN,
  useClass: TypeOrmTransactionManager,
};
