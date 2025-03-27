import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.all();
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    const user = await this.usersService.get(id);
    if (!user) {
        throw new NotFoundException("The user doesn't exist.")
    }

    return user
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }
}
