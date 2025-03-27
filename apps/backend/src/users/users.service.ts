import { Inject, Injectable } from "@nestjs/common";
import { USERS_REPOSITORY_TOKEN, IUsersRepository } from "./ports/users.repository.interface";
import { ID_GENERATOR, IIDGenerator } from "../core/ports/id-generator.interface";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IIDGenerator,
  ) {}

  async all() {
    return await this.usersRepository.findAll();
  }

  async get(id: string) {
    return await this.usersRepository.findById(id);
  }

  async create(data: CreateUserDto) {
    const user = {
      id: this.idGenerator.generate(),
      name: data.name,
    };

    await this.usersRepository.create(user);

    return user;
  }
}
