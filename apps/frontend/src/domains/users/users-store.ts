import { create } from "zustand";
import { HttpUsersService } from "./adapters/http-users.service";
import { FetchHttpClient } from "@/core/http/adapter/fetch-http-client";
import { IUsersService } from "./ports/users.service.interface";
import { IUser } from "@avicenne/shared/users";
import { getErrorMessage } from "@/core/utils/get-error-message";

interface UsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  createUser: (name: string) => Promise<void>;
}

export function createUsersStore(usersService: IUsersService) {
  return create<UsersState>((set) => ({
    users: [],
    loading: false,
    error: null,

    async fetchUsers() {
      set({ loading: true, error: null });
      try {
        const data = await usersService.getAll();
        set({ users: data, loading: false });
      } catch (err: unknown) {
        set({
          error: getErrorMessage(err) ?? "Error fetching users",
          loading: false,
        });
      }
    },

    async createUser(name: string) {
      try {
        const newUser = await usersService.create({ name });
        set((state) => ({ users: [...state.users, newUser] }));
      } catch (err: unknown) {
        set({ error: getErrorMessage(err) ?? "Error creating user" });
      }
    },
  }));
}

export const useUsersStore = createUsersStore(
  new HttpUsersService(new FetchHttpClient("http://localhost:8000/api")),
);
