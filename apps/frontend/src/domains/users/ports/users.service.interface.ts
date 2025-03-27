import { IUser } from "../types/users";

export interface CreateUserDto {
  name: string;
}

export interface IUsersService {
  getAll(): Promise<IUser[]>;
  create(data: CreateUserDto): Promise<IUser>;
}
