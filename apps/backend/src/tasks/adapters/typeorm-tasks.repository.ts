import { Injectable } from "@nestjs/common";
import { EntityManager, type Repository } from "typeorm";

import {
  TASKS_REPOSITORY_TOKEN,
  type ITasksRepository,
} from "../ports/tasks.repository.interface";
import { TaskEntity } from "../../core/adapters/type-orm/entities/task.entity";
import type { UserEntity } from "../../core/adapters/type-orm/entities/user.entity";
import type { UpdateTaskDto } from "../dtos/update-task.dto";
import { ITransaction } from "../../core/ports/transaction-manager.interface";
import { ITask } from "@avicenne/shared/tasks";

@Injectable()
export class TypeOrmTasksRepository implements ITasksRepository {
  private readonly repo: Repository<TaskEntity>;

  constructor(private readonly em: EntityManager) {
    this.repo = em.getRepository(TaskEntity);
  }

  async findById(id: string, tx?: ITransaction) {
    const manager = (tx as EntityManager) ?? this.repo.manager;
    return await manager.findOne(TaskEntity, {
      where: { id },
      relations: ["assignedUser"],
    });
  }

  public async findIncompleteTasks(tx?: ITransaction) {
    const manager = (tx as EntityManager) ?? this.repo.manager;
    return await manager.find(TaskEntity, { where: { isCompleted: false }, relations: ['assignedUser'] });
  }

  async create(props: ITask, tx?: ITransaction) {
    const manager = (tx as EntityManager) ?? this.repo.manager;
    const task = manager.create(TaskEntity, {
      id: props.id,
      title: props.title,
      isCompleted: false,
      assignedUser: props.assignedUser,
    });

    await manager.save(task);
  }

  async update(
    id: string,
    props: UpdateTaskDto,
    tx?: ITransaction,
  ) {
    const manager = (tx as EntityManager) ?? this.repo.manager;
    await manager.update(TaskEntity, { id }, props);
  }

  async assign(id: string, user?: UserEntity, tx?: ITransaction) {
    const manager = (tx as EntityManager) ?? this.repo.manager;

    await manager.save(TaskEntity, { id, assignedUser: user ?? null });
  }

  async delete(id: string) {
    const result = await this.repo.delete(id);

    return (result.affected && result.affected > 0) === true
  }
}

export const TypeOrmTasksRepositoryProvider = {
  provide: TASKS_REPOSITORY_TOKEN,
  useClass: TypeOrmTasksRepository,
};
