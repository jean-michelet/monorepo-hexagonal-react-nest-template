import { Injectable } from "@nestjs/common";
import { EntityManager, type Repository } from "typeorm";

import {
  USERS_REPOSITORY_TOKEN,
  type IUsersRepository,
} from "../ports/users.repository.interface";
import { UserEntity } from "../../core/adapters/type-orm/entities/user.entity";
import { ITransaction } from "../../core/ports/transaction-manager.interface";
import { IUser  } from "@avicenne/shared/users";

@Injectable()
export class TypeOrmUsersRepository implements IUsersRepository {
  private readonly repo: Repository<UserEntity>;

  constructor(private readonly em: EntityManager) {
    this.repo = em.getRepository(UserEntity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: string, tx?: ITransaction) {
    const manager = (tx as EntityManager) ?? this.repo.manager;

    return await manager.findOne(UserEntity, {
      where: { id },
    });
  }

  async create(user: IUser) {
    await this.repo.save(user);
  }
}

export const TypeOrmUsersRepositoryProvider = {
  provide: USERS_REPOSITORY_TOKEN,
  useClass: TypeOrmUsersRepository,
};
