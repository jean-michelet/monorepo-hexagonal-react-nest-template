import { IUser } from "../users";

export interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
    assignedUser?: IUser | null;
  }
  
  export interface ICreateTask {
    title: string;
    assigneeId?: string;
  }
  
  export interface IUpdateTask {
    title?: string;
    isCompleted?: boolean;
    assigneeId?: string;
  }