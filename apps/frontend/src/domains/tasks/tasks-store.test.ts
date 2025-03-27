import { describe, it, expect, beforeEach } from "vitest";
import { createTasksStore } from "./tasks-store";
import { InMemoryTasksService } from "./adapters/in-memory-tasks.service";

describe("Tasks Store", () => {
  let useTestStore: ReturnType<typeof createTasksStore>;

  beforeEach(() => {
    useTestStore = createTasksStore(new InMemoryTasksService());
  });

  it("fetchTasks should load incomplete tasks", async () => {
    await useTestStore.getState().fetchTasks();
    const tasks = useTestStore.getState().tasks;
    expect(tasks.length).toBe(2);
  });

  it("createTask should add a new task", async () => {
    await useTestStore.getState().createTask({ title: "New Task" });
    const tasks = useTestStore.getState().tasks;
    const notifications = useTestStore.getState().notifiedTaskIds;

    expect(tasks.some((t) => t.title === "New Task")).toBe(true);

    expect(notifications).toHaveLength(1);
    expect(notifications).toEqual(tasks.map((t) => t.id));
  });

  it("updateTask should modify an existing task", async () => {
    await useTestStore.getState().fetchTasks();
    const [taskToUpdate] = useTestStore.getState().tasks;
    await useTestStore.getState().updateTask(taskToUpdate.id, {
      title: "Updated Title",
    });
    const updatedTask = useTestStore
      .getState()
      .tasks.find((t) => t.id === taskToUpdate.id);
    expect(updatedTask?.title).toBe("Updated Title");
  });

  it("assignTask should add assignedUser to a task", async () => {
    await useTestStore.getState().fetchTasks();
    const [task] = useTestStore.getState().tasks;
    await useTestStore.getState().assignTask(task.id, "user-123");
    const updatedTask = useTestStore
      .getState()
      .tasks.find((t) => t.id === task.id);
    expect(updatedTask?.assignedUser).toEqual({
      id: "user-123",
      name: "Some-user-name",
    });
  });

  it("unassignTask should remove assignedUser from a task", async () => {
    await useTestStore.getState().fetchTasks();
    const [task] = useTestStore.getState().tasks;
    await useTestStore.getState().assignTask(task.id, "user-123");
    await useTestStore.getState().unassignTask(task.id);
    const updatedTask = useTestStore
      .getState()
      .tasks.find((t) => t.id === task.id);
    expect(updatedTask?.assignedUser).toBeUndefined();
  });

  it("dismissNotification should remove notifiedTaskIds", async () => {
    await useTestStore.getState().createTask({ title: "New Task" });
    await useTestStore.getState().createTask({ title: "New Task 2" });

    const tasks = useTestStore.getState().tasks;
    const notificationsBefore = useTestStore.getState().notifiedTaskIds;

    expect(notificationsBefore).toHaveLength(2);

    useTestStore.getState().dismissNotification(tasks[0].id);

    const notificationsAfter = useTestStore.getState().notifiedTaskIds;
    expect(notificationsAfter).toHaveLength(1);
    expect(notificationsAfter[0]).not.toEqual(tasks[0].id);
  });
});
