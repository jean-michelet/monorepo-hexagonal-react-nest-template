import {
  USERS_REPOSITORY_TOKEN,
  type IUsersRepository,
} from "../ports/users.repository.interface";
import type { IUser } from "../models/user";
import { ITransaction } from "../../core/ports/transaction-manager.interface";

export class FakeUsersRepository implements IUsersRepository {
  constructor(private readonly users: IUser[] = []) {
    const writeMethods = ["create"] as const;
    writeMethods.forEach((method) => {
      jest.spyOn(this as FakeUsersRepository, method);
    });
  }

  async findAll () {
    return this.users
  };

  async findById(id: string, _tx?: ITransaction) {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async create(user: IUser) {};
}

export const FakeUsersRepositoryProvider = {
  provide: USERS_REPOSITORY_TOKEN,
  useClass: FakeUsersRepository,
};
