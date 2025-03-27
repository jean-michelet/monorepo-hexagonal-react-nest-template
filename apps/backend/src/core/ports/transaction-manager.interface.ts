export const TRANSACTION_MANAGER_TOKEN = Symbol("TRANSACTION_MANAGER_TOKEN");

export interface ITransaction {}

export interface ITransactionManager {
  transaction: <T = unknown>(
    callback: (transaction: ITransaction) => Promise<T>,
  ) => Promise<T>;
}
