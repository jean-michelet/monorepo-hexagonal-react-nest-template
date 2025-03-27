/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  USERS_REPOSITORY_TOKEN,
  type IUsersRepository,
} from "../ports/users.repository.interface";
import type { IUser } from "../models/user";
import { ITransaction } from "src/core/ports/transaction-manager.interface";

export class FakeUsersRepository implements IUsersRepository {
  constructor(private readonly users: IUser[] = []) {}

  async findById(id: string, _tx?: ITransaction) {
    return this.users.find((u) => u.id === id) ?? null;
  }
}

export const FakeUsersRepositoryProvider = {
  provide: USERS_REPOSITORY_TOKEN,
  useClass: FakeUsersRepository,
};
