import { describe, it, expect, beforeEach } from "vitest";
import { createUsersStore } from "./users-store";
import { InMemoryUsersService } from "./adapters/in-memory-users.service";

describe("Users Store", () => {
  let useTestStore: ReturnType<typeof createUsersStore>;

  beforeEach(() => {
    useTestStore = createUsersStore(new InMemoryUsersService());
  });

  it("fetchUsers should load users", async () => {
    await useTestStore.getState().fetchUsers();
    const users = useTestStore.getState().users;

    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
  });

  it("createUser should add a new user", async () => {
    await useTestStore.getState().createUser("Charlie");

    const users = useTestStore.getState().users;
    const created = users.find((u) => u.name === "Charlie");

    expect(created).toBeDefined();
    expect(created?.id).toBeDefined();
  });

  it("createUser should not overwrite existing users", async () => {
    const before = useTestStore.getState().users.length;

    await useTestStore.getState().createUser("Dave");
    const after = useTestStore.getState().users.length;
    expect(after).toBe(before + 1);
  });

  it("should handle errors gracefully", async () => {
    const brokenService = {
      getAll: async () => {
        throw new Error("Oops");
      },
      create: async () => {
        throw new Error("Nope");
      },
    };

    const brokenStore = createUsersStore(brokenService);

    await brokenStore.getState().fetchUsers();
    expect(brokenStore.getState().error).toBe("Oops");

    await brokenStore.getState().createUser("Fail");
    expect(brokenStore.getState().error).toBe("Nope");
  });
});
