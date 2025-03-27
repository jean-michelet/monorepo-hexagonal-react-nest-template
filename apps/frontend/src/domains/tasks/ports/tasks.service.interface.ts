import { IUser } from "@/domains/users/types/users";
import { CreateTaskDto, Task, UpdateTaskDto } from "../types/tasks";

export interface ITasksService {
  getTask(id: string): Promise<Task | null>;
  getIncompleteTasks(): Promise<Task[]>;
  createTask(data: CreateTaskDto): Promise<Task>;
  updateTask(id: string, data: UpdateTaskDto): Promise<void>;
  assignTask(id: string, assigneeId: string): Promise<IUser>;
  unassignTask(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
