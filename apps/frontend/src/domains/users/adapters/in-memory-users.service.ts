import { IUser } from "@avicenne/shared/users";
import { CreateUserDto, IUsersService } from "../ports/users.service.interface";

export class InMemoryUsersService implements IUsersService {
  private users: IUser[] = [
    { id: "user1", name: "Alice" },
    { id: "user2", name: "Bob" },
  ];

  async getAll() {
    return this.users;
  }

  async create(data: CreateUserDto) {
    const newUser: IUser = {
      id: (Math.random() * 10000).toFixed(0),
      name: data.name,
    };
    this.users.push(newUser);
    return newUser;
  }
}
