import type { IUser } from "../../users/models/user";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
  assignedUser?: IUser | null;
}
