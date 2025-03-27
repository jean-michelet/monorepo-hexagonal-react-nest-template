import { UsersService } from "./users.service";
import { FakeUsersRepository } from "./adapters/fake-users.repository";
import { StubIDGenerator } from "../core/adapters/stub-id-generator";
import { UserFixtures } from "../fixtures/users.fixture";

describe("UsersService", () => {
  let service: UsersService;
  let usersRepository: FakeUsersRepository;
  let idGenerator: StubIDGenerator;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository(UserFixtures);
    idGenerator = new StubIDGenerator();

    service = new UsersService(usersRepository, idGenerator);
  });

  describe("all()", () => {
    it("should return all users", async () => {
      const user = await service.all();
      expect(user).toStrictEqual(UserFixtures);
    });
  });

  describe("get()", () => {
    it("should return user", async () => {
      const user = await service.get(UserFixtures[0].id);
      expect(user).toStrictEqual(UserFixtures[0]);
    });

    it("should return null if user does not exist", async () => {
      const user = await service.get("nonexistent");
      expect(user).toBeNull();
    });
  });

  describe("create()", () => {
    it("should create and return a user", async () => {
      const user = await service.create({ name: "Alice" });
      const expected = {
        id: "id-1",
        name: "Alice",
      };

      expect(user).toMatchObject(expected);
      expect(usersRepository.create).toHaveBeenCalledWith(expected);
    });
  });
});
