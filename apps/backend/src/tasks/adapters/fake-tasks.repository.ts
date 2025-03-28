import {
  TASKS_REPOSITORY_TOKEN,
  type ITasksRepository,
} from "../ports/tasks.repository.interface";
import type { CreateTaskDto } from "../dtos/create-task.dto";
import type { UpdateTaskDto } from "../dtos/update-task.dto";
import { ITransaction } from "../../core/ports/transaction-manager.interface";
import { IUser } from "@avicenne/shared/users";
import { ITask } from "@avicenne/shared/tasks";

export class FakeTasksRepository implements ITasksRepository {
  constructor(private readonly tasks: ITask[] = []) {
    const writeMethods = ["create", "update", "assign", "delete"] as const;
    writeMethods.forEach((method) => {
      jest.spyOn(this as FakeTasksRepository, method);
    });
  }

  public async findById(id: string, _tx?: ITransaction) {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  public async findIncompleteTasks(tx?: ITransaction) {
    return this.tasks.filter((t) => !t.isCompleted);
  }

  public async create(_props: CreateTaskDto, _tx?: ITransaction) {}

  public async update(_id: string, _props: UpdateTaskDto, _tx?: ITransaction) {}

  public async assign(_id: string, _user?: IUser, _tx?: ITransaction) {}

  public async delete(_id: string) {
    return this.tasks.some((t) => t.id === _id);
  }
}

export const FakeTasksRepositoryProvider = {
  provide: TASKS_REPOSITORY_TOKEN,
  useClass: FakeTasksRepository,
};
