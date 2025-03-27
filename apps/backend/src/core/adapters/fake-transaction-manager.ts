import { ITransaction, ITransactionManager, TRANSACTION_MANAGER_TOKEN } from "../ports/transaction-manager.interface";

export class FakeTransactionManager implements ITransactionManager {
  public async transaction<T = unknown>(
    callback: (transaction: ITransaction) => Promise<T>,
  ) {
    return await callback({});
  }
}

export const FakeTransactionManagerProvider = {
  provide: TRANSACTION_MANAGER_TOKEN,
  useClass: FakeTransactionManager,
};
