import { IHttpClient } from "@/core/http/ports/http-client";
import { ITasksService } from "../ports/tasks.service.interface";
import { ICreateTask, ITask, IUpdateTask } from "@avicenne/shared/tasks";
import { IUser } from "@avicenne/shared/users";

export class HttpTasksService implements ITasksService {
  constructor(private readonly httpClient: IHttpClient) {}

  getTask(id: string): Promise<ITask | null> {
    return this.httpClient.request("GET", `/tasks/${id}`);
  }

  getIncompleteTasks(): Promise<ITask[]> {
    return this.httpClient.request("GET", "/tasks");
  }

  createTask(data: ICreateTask): Promise<ITask> {
    return this.httpClient.request("POST", "/tasks", {
      body: JSON.stringify(data),
    });
  }

  updateTask(id: string, data: IUpdateTask): Promise<void> {
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
