import { ITransaction } from "../../core/ports/transaction-manager.interface";
import type { IUser } from "../models/user";

export const USERS_REPOSITORY_TOKEN = Symbol("USERS_REPOSITORY_TOKEN");

export interface IUsersRepository {
  findAll: () => Promise<IUser[]>;

  findById: (id: string, tx?: ITransaction) => Promise<IUser | null>;

  create: (user: IUser) => Promise<void>;
}
