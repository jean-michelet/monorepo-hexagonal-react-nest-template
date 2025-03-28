import { IUser } from "@avicenne/shared/users";

export interface CreateUserDto {
  name: string;
}

export interface IUsersService {
  getAll(): Promise<IUser[]>;
  create(data: CreateUserDto): Promise<IUser>;
}
