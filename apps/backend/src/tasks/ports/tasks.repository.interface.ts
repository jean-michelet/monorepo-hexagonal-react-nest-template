import { IUser } from "@avicenne/shared/users";
import { ITransaction } from "../../core/ports/transaction-manager.interface";

import type { UpdateTaskDto } from "../dtos/update-task.dto";
import { ITask } from "@avicenne/shared/tasks";

export const TASKS_REPOSITORY_TOKEN = Symbol("TASKS_REPOSITORY_TOKEN");

export interface ITasksRepository {
  findById: (id: string, tx?: ITransaction) => Promise<ITask | null>;

  findIncompleteTasks: (tx?: ITransaction) => Promise<ITask[]>;

  create: (props: ITask, tx?: ITransaction) => Promise<void>;

  update: (
    id: string,
    props: UpdateTaskDto,
    tx?: ITransaction,
  ) => Promise<void>;

  assign: (id: string, user?: IUser, tx?: ITransaction) => Promise<void>;

  delete: (id: string) => Promise<boolean>;
}
