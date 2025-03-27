import { NotFoundException } from "@nestjs/common";

import { FakeTasksRepository } from "./adapters/fake-tasks.repository";
import { TasksService } from "./tasks.service";
import { FakeTransactionManager } from "../core/adapters/fake-transaction-manager";
import { TaskFixtures } from "../fixtures/tasks.fixture";
import { UserFixtures } from "../fixtures/users.fixture";
import { FakeUsersRepository } from "../users/adapters/fake-users.repository";
import { StubIDGenerator } from "../core/adapters/stub-id-generator";

describe("TasksService", () => {
  let service: TasksService;
  let tasksRepository: FakeTasksRepository;
  let usersRepository: FakeUsersRepository;
  let trxManager: FakeTransactionManager;
  let idGenerator: StubIDGenerator;

  beforeEach(() => {
    tasksRepository = new FakeTasksRepository(TaskFixtures);
    usersRepository = new FakeUsersRepository(UserFixtures);
    trxManager = new FakeTransactionManager();
    idGenerator = new StubIDGenerator();

    service = new TasksService(
      trxManager,
      tasksRepository,
      usersRepository,
      idGenerator,
    );
  });

  describe("get()", () => {
    it("should return a task by ID", async () => {
      const task = await service.get("task1");
      expect(task).toEqual({
        id: "task1",
        title: "Task One",
        isCompleted: false,
      });
    });

    it("should return null if the task does not exist", async () => {
      const task = await service.get("nonexistent-task");
      expect(task).toBeNull();
    });
  });

  describe("getIncompleteTasks()", () => {
    it("should return all incomplete tasks", async () => {
      const tasks = await service.getIncompleteTasks();
      expect(tasks).toHaveLength(2);
    });

    it("should return an empty array if no tasks are incomplete", async () => {
      tasksRepository = new FakeTasksRepository([
        { id: "task1", title: "Test Task 1", isCompleted: true },
      ]);
      service = new TasksService(
        trxManager,
        tasksRepository,
        usersRepository,
        idGenerator,
      );

      const tasks = await service.getIncompleteTasks();
      expect(tasks).toEqual([]);
    });
  });

  describe("createTask()", () => {
    it("should call create() in the repository", async () => {
      const taskData = { title: "New Task" };
      await service.create(taskData);

      expect(tasksRepository.create).toHaveBeenCalledWith({
        ...taskData,
        id: "id-1",
        isCompleted: false,
        assignedUser: undefined,
      });
    });
  });

  describe("updateTask()", () => {
    it("should call update() in the repository", async () => {
      const updateData = { title: "Updated Task" };
      await service.update("task1", updateData);

      expect(tasksRepository.update).toHaveBeenCalledWith(
        "task1",
        updateData,
        {},
      );
    });

    it("should throw NotFoundException if task does not exist", async () => {
      await expect(service.update("nonexistent", {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("assignTask()", () => {
    it("should assign a task to a user if both exist", async () => {
      const [user] = UserFixtures;
      const assignedUser = await service.assign("task1", user.id);

      expect(user).toEqual(assignedUser)
      expect(tasksRepository.assign).toHaveBeenCalledWith(
        "task1",
        user,
        expect.anything(),
      );
    });

    it("should throw NotFoundException if task does not exist", async () => {
      await expect(service.assign("nonexistent-task", "user1")).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw NotFoundException if user does not exist", async () => {
      await expect(service.assign("task1", "nonexistent-user")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("unassignTask()", () => {
    it("should unassign a task if it exists", async () => {
      await service.unassign("task1");

      expect(tasksRepository.assign).toHaveBeenCalledWith(
        "task1",
        undefined,
        expect.anything(),
      );
    });

    it("should throw NotFoundException if task does not exist", async () => {
      await expect(service.unassign("nonexistent-task")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("delete()", () => {
    it("should delete a task if it exists", async () => {
      await service.delete("task1");

      expect(tasksRepository.delete).toHaveBeenCalledWith("task1");
    });

    it("should throw NotFoundException if task does not exist", async () => {
      await expect(service.delete("nonexistent-task")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
