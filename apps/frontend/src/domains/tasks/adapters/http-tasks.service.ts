import { IHttpClient } from "@/core/http/ports/http-client";
import { ITasksService } from "../ports/tasks.service.interface";
import { CreateTaskDto, Task, UpdateTaskDto } from "../types/tasks";
import { IUser } from "@/domains/users/types/users";

export class HttpTasksService implements ITasksService {
  constructor(private readonly httpClient: IHttpClient) {}

  getTask(id: string): Promise<Task | null> {
    return this.httpClient.request("GET", `/tasks/${id}`);
  }

  getIncompleteTasks(): Promise<Task[]> {
    return this.httpClient.request("GET", "/tasks");
  }

  createTask(data: CreateTaskDto): Promise<Task> {
    return this.httpClient.request("POST", "/tasks", {
      body: JSON.stringify(data),
    });
  }

  updateTask(id: string, data: UpdateTaskDto): Promise<void> {
    return this.httpClient.request("PATCH", `/tasks/${id}`, {
      body: JSON.stringify(data),
    });
  }

  assignTask(id: string, assigneeId: string) {
    return this.httpClient.request<IUser>("PATCH", `/tasks/assign/${id}`, {
      body: JSON.stringify({ assigneeId }),
    });
  }

  unassignTask(id: string): Promise<void> {
    return this.httpClient.request("PATCH", `/tasks/unassign/${id}`, {
      body: JSON.stringify({ assigneeId: undefined }),
    });
  }

  delete(id: string): Promise<void> {
    return this.httpClient.request("DELETE", `/tasks/${id}`);
  }
}
