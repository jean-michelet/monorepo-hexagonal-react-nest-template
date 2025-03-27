import type { IHttpClient } from "@/core/http/ports/http-client";
import { IUser } from "../types/users";
import { CreateUserDto, IUsersService } from "../ports/users.service.interface";

export class HttpUsersService implements IUsersService {
  constructor(private readonly httpClient: IHttpClient) {}

  getAll(): Promise<IUser[]> {
    return this.httpClient.request("GET", "/users");
  }

  create(data: CreateUserDto): Promise<IUser> {
    return this.httpClient.request("POST", "/users", {
      body: JSON.stringify(data),
    });
  }
}
