import * as request from "supertest";

import {
  type ITasksRepository,
  TASKS_REPOSITORY_TOKEN,
} from "./ports/tasks.repository.interface";
import { UserFixtures } from "../fixtures/users.fixture";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createTestApp } from "../createTestApp";
import {
  FIXTURES_LOADER_TOKEN,
  IFixturesLoader,
} from "../fixtures/ports/fixtures-loader.interface";
import { TaskFixtures } from "../fixtures/tasks.fixture";

describe("TasksController (E2E)", () => {
  let app: NestFastifyApplication;
  let fixturesLoader: IFixturesLoader;
  let tasksRepository: ITasksRepository;

  beforeAll(async () => {
    app = await createTestApp();

    fixturesLoader = app.get<IFixturesLoader>(FIXTURES_LOADER_TOKEN);

    tasksRepository = app.get<ITasksRepository>(TASKS_REPOSITORY_TOKEN);
  });

  beforeEach(async () => {
    await fixturesLoader.purge();
    await fixturesLoader.load({
      tasks: TaskFixtures,
      users: UserFixtures,
    });
  });

  afterAll(async () => {
    await fixturesLoader.purge();
    await app.close();
  });

  describe("GET /tasks/:id", () => {
    it("should return a task", async () => {
      await request(app.getHttpServer())
        .get("/api/tasks/task1")
        .expect(200)
        .expect({
          id: "task1",
          title: "Task One",
          isCompleted: false,
          assignedUser: null,
        });
    });
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      await request(app.getHttpServer())
        .get("/api/tasks")
        .expect(200)
        .expect([
          {
            id: "task1",
            title: "Task One",
            isCompleted: false,
          },
          {
            id: "task2",
            title: "Task Two",
            isCompleted: false,
          },
        ]);
    });
  });

  describe("POST /tasks", () => {
    it("should create a task", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/tasks")
        .send({ title: "New Task" })
        .expect(201);

      expect(res.body).toEqual({
        id: expect.any(String),
        title: "New Task",
        isCompleted: false,
      });

      const includesCreatedTasks = (
        await tasksRepository.findIncompleteTasks()
      ).some((t) => t.title === "New Task");

      expect(includesCreatedTasks);
    });

    it("should return 400 if title is missing", async () => {
      await request(app.getHttpServer())
        .post("/api/tasks")
        .send({})
        .expect(400);
    });
  });

  describe("PATCH /tasks/:id", () => {
    it("should update a task", async () => {
      await request(app.getHttpServer())
        .patch("/api/tasks/task1")
        .send({ title: "Updated Task" })
        .expect(200);

      const result = await tasksRepository.findById("task1");
      expect(result).not.toBeNull();
    });
  });

  describe("PATCH /tasks/assign/:id", () => {
    it("should assign a task", async () => {
      await request(app.getHttpServer())
        .patch("/api/tasks/assign/task1")
        .send({ assigneeId: "user1" })
        .expect(200);

      const result = await tasksRepository.findById("task1");
      expect(result?.assignedUser).toMatchObject({
        id: "user1",
      });
    });

    it("should return 400 for invalid request format", async () => {
      await request(app.getHttpServer())
        .patch("/api/tasks/assign/task1")
        .expect(400);
    });
  });

  describe("PATCH /tasks/unassign/:id", () => {
    it("should unassign a task", async () => {
      await tasksRepository.assign("task1", UserFixtures[0]);
      const resultBeforeUnassignment = await tasksRepository.findById("task1");
      expect(resultBeforeUnassignment?.assignedUser).toMatchObject({
        id: "user1",
      });

      await request(app.getHttpServer())
        .patch("/api/tasks/unassign/task1")
        .expect(200);

      const resultAfterUnassignment = await tasksRepository.findById("task1");
      expect(resultAfterUnassignment?.assignedUser).toBeNull();
    });
  });

  describe("DELETE /tasks/delete/:id", () => {
    it("should delete a task", async () => {
      const exists = await tasksRepository.findById("task1");
      expect(exists).not.toBeNull();

      await tasksRepository.delete("task1");

      await request(app.getHttpServer()).delete("/api/tasks/task1").expect(404);

      const doesntExist = await tasksRepository.findById("task1");
      expect(doesntExist).toBeNull();
    });
  });
});
