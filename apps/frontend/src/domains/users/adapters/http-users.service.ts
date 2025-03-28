import type { IHttpClient } from "@/core/http/ports/http-client";
import { CreateUserDto, IUsersService } from "../ports/users.service.interface";
import { IUser } from "@avicenne/shared/users";

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
