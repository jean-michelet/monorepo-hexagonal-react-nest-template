import { create } from "zustand";
import type { ITasksService } from "./ports/tasks.service.interface";
import { CreateTaskDto, Task, UpdateTaskDto } from "./types/tasks";
import { HttpTasksService } from "./adapters/http-tasks.service";
import { FetchHttpClient } from "@/core/http/adapter/fetch-http-client";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  notifiedTaskIds: string[];

  fetchTasks: () => Promise<void>;
  createTask: (data: CreateTaskDto) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  assignTask: (id: string, assigneeId: string) => Promise<void>;
  unassignTask: (id: string) => Promise<void>;  
  dismissNotification: (id: string) => void;
}

export function createTasksStore(tasksService: ITasksService) {
  return create<TasksState>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    notifiedTaskIds: [],

    async fetchTasks() {
      set({ loading: true, error: null });
      try {
        const data = await tasksService.getIncompleteTasks();
        set({ tasks: data, loading: false });
      } catch (err: any) {
        set({ error: err.message ?? "Error fetching tasks", loading: false });
      }
    },

    async createTask(data: CreateTaskDto) {
      try {
        const newTask = await tasksService.createTask(data);
        set((state) => ({
          tasks: [...state.tasks, newTask],
          notifiedTaskIds: [...state.notifiedTaskIds, newTask.id],
        }));
      } catch (err: any) {
        set({ error: err.message ?? "Error creating task" });
      }
    },

    async updateTask(id: string, data: UpdateTaskDto) {
      try {
        await tasksService.updateTask(id, data);
        const updatedTasks = get().tasks.map((t) =>
          t.id === id ? { ...t, ...data } : t
        );
        set({ tasks: updatedTasks });
      } catch (err: any) {
        set({ error: err.message ?? "Error updating task" });
      }
    },

    async assignTask(id: string, assigneeId: string) {
      try {
        await tasksService.assignTask(id, assigneeId);
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  assignedUser: { id: assigneeId, name: "Some-user-name" },
                }
              : t
          ),
        }));
      } catch (err: any) {
        set({ error: err.message ?? "Error assigning task" });
      }
    },

    async unassignTask(id: string) {
      try {
        await tasksService.unassignTask(id);
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, assignedUser: undefined } : t
          ),
        }));
      } catch (err: any) {
        set({ error: err.message ?? "Error unassigning task" });
      }
    },

    dismissNotification(id: string) {
      set((state) => ({
        notifiedTaskIds: state.notifiedTaskIds.filter((tid) => tid !== id),
      }));
    },
  }));
}

export const useTasksStore = createTasksStore(
  new HttpTasksService(new FetchHttpClient("http://localhost:8000/api"))
);
