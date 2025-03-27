export interface IUser {
  id: string;
  name: string;
  assignedTasks?: ITask[];
}
