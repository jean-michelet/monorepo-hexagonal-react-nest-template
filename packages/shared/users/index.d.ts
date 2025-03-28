import { ITask } from "../tasks";

export interface IUser {
  id: string;
  name: string;
  assignedTasks?: ITask[];
}
