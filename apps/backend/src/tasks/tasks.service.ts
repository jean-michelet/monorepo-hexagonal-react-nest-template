import { Injectable, Inject, NotFoundException } from "@nestjs/common";

import type { CreateTaskDto } from "./dtos/create-task.dto";
import type { UpdateTaskDto } from "./dtos/update-task.dto";
import {
  ITasksRepository,
  TASKS_REPOSITORY_TOKEN,
} from "./ports/tasks.repository.interface";
import {
  ITransactionManager,
  TRANSACTION_MANAGER_TOKEN,
} from "../core/ports/transaction-manager.interface";
import {
  IUsersRepository,
  USERS_REPOSITORY_TOKEN,
} from "../users/ports/users.repository.interface";
import { IUser  } from "@avicenne/shared/users";
import { ID_GENERATOR, IIDGenerator } from "../core/ports/id-generator.interface";

@Injectable()
export class TasksService {
  constructor(
    @Inject(TRANSACTION_MANAGER_TOKEN)
    private readonly trxManager: ITransactionManager,
    @Inject(TASKS_REPOSITORY_TOKEN)
    private readonly tasksRepository: ITasksRepository,
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IIDGenerator,
  ) {}

  async get(id: string) {
    return await this.tasksRepository.findById(id);
  }

  async getIncompleteTasks() {
    return await this.tasksRepository.findIncompleteTasks();
  }

  async create(data: CreateTaskDto) {
    const { title, assigneeId } = data;
    let assignedUser: null | IUser = null
    if (assigneeId !== undefined) {
      assignedUser = await this.usersRepository.findById(assigneeId)
    }

    const id = this.idGenerator.generate()
    const createdTask = {
      id,
      title,
      isCompleted: false,
      assignedUser
    }
    
    await this.tasksRepository.create(createdTask);

    return createdTask
  }

  async update(id: string, data: UpdateTaskDto) {
    await this.trxManager.transaction(async (tx) => {
      const existingTask = await this.tasksRepository.findById(id, tx);

      if (!existingTask) throw new NotFoundException("Task not found");

      await this.tasksRepository.update(id, data, tx);
    });
  }

  async assign(id: string, assigneeId: string) {
    return await this.trxManager.transaction(async (tx) => {
      const task = await this.tasksRepository.findById(id, tx);
      if (!task) throw new NotFoundException("Task not found");

      const user = await this.usersRepository.findById(assigneeId, tx);
      if (!user) throw new NotFoundException("User not found");

      await this.tasksRepository.assign(id, user, tx);

      return user
    });
  }

  async unassign(id: string) {
    await this.trxManager.transaction(async (tx) => {
      const task = await this.tasksRepository.findById(id, tx);
      if (!task) throw new NotFoundException("Task not found");

      await this.tasksRepository.assign(id, undefined, tx);
    });
  }

  async delete(id: string) {
    const deleted = await this.tasksRepository.delete(id);
    if (!deleted) throw new NotFoundException("Task not found");
  }
}
