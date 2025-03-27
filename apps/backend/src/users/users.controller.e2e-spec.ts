import * as request from "supertest";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createTestApp } from "../createTestApp";
import {
  FIXTURES_LOADER_TOKEN,
  IFixturesLoader,
} from "../fixtures/ports/fixtures-loader.interface";
import { UserFixtures } from "../fixtures/users.fixture";
import {
  IUsersRepository,
  USERS_REPOSITORY_TOKEN,
} from "./ports/users.repository.interface";

describe("UsersController (E2E)", () => {
  let app: NestFastifyApplication;
  let fixturesLoader: IFixturesLoader;
  let usersRepository: IUsersRepository;

  beforeAll(async () => {
    app = await createTestApp();
    fixturesLoader = app.get<IFixturesLoader>(FIXTURES_LOADER_TOKEN);
    usersRepository = app.get<IUsersRepository>(USERS_REPOSITORY_TOKEN);
  });

  beforeEach(async () => {
    await fixturesLoader.purge();
    await fixturesLoader.load({
      users: UserFixtures,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(app.getHttpServer())
        .get("/api/users")
        .expect(200);

      expect(res.body).toEqual(UserFixtures);
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user", async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/users/${UserFixtures[0].id}`)
        .expect(200);

      expect(res.body).toEqual(UserFixtures[0]);
    });

    it("should return 404 if user does not exist", async () => {
      await request(app.getHttpServer())
        .get("/api/users/nonexistent")
        .expect(404);
    });
  });

  describe("POST /users", () => {
    it("should create a user", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/users")
        .send({ name: "New User" })
        .expect(201);

      expect(res.body).toEqual({
        id: expect.any(String),
        name: "New User",
      });

      const stored = await usersRepository.findById(res.body.id);
      expect(stored?.name).toBe("New User");

      const includesCreatedUser = (await usersRepository.findAll()).some(
        (t) => t.name === "New User",
      );

      expect(includesCreatedUser);
    });

    it("should return 400 if name is missing", async () => {
      await request(app.getHttpServer())
        .post("/api/users")
        .send({})
        .expect(400);
    });
  });
});
