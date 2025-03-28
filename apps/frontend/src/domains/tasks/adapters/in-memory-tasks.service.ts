import { ICreateTask, ITask, IUpdateTask } from "@avicenne/shared/tasks";
import type { ITasksService } from "../ports/tasks.service.interface";

export class InMemoryTasksService implements ITasksService {
  private tasks: ITask[] = [
    {
      id: "1",
      title: "Sample Task 1",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Sample Task 2",
      isCompleted: false,
    },
  ];

  async getTask(id: string) {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  async getIncompleteTasks() {
    return this.tasks.filter((t) => !t.isCompleted);
  }

  async createTask(data: ICreateTask) {
    const newTask: ITask = {
      id: (Math.random() * 10000).toFixed(0),
      title: data.title,
      isCompleted: false,
      assignedUser: data.assigneeId
        ? { id: data.assigneeId, name: "FakeUser" }
        : undefined,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, data: IUpdateTask) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx < 0) throw new Error("Task not found");

    this.tasks[idx] = {
      ...this.tasks[idx],
      ...data,
    };
  }

  async assignTask(id: string, assigneeId: string) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx < 0) throw new Error("Task not found");

    this.tasks[idx].assignedUser = { id: assigneeId, name: "FakeUser" };
    return this.tasks[idx].assignedUser;
  }

  async unassignTask(id: string) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx < 0) throw new Error("Task not found");

    delete this.tasks[idx].assignedUser;
  }

  async delete(id: string) {
    const idx = this.tasks.some((t) => t.id === id);
    if (idx === undefined) throw new Error("Task not found");

    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
