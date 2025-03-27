import { IUser } from "@/domains/users/types/users";

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  assignedUser?: IUser;
}

export interface CreateTaskDto {
  title: string;
  assigneeId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  isCompleted?: boolean;
}
