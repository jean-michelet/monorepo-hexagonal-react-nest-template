import { ICreateTask, ITask, IUpdateTask } from "@avicenne/shared/tasks";
import { IUser } from "@avicenne/shared/users";

export interface ITasksService {
  getTask(id: string): Promise<ITask | null>;
  getIncompleteTasks(): Promise<ITask[]>;
  createTask(data: ICreateTask): Promise<ITask>;
  updateTask(id: string, data: IUpdateTask): Promise<void>;
  assignTask(id: string, assigneeId: string): Promise<IUser>;
  unassignTask(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
