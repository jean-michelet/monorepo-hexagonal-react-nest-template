import { create } from "zustand";
import { HttpUsersService } from "./adapters/http-users.service";
import { FetchHttpClient } from "@/core/http/adapter/fetch-http-client";
import { IUsersService } from "./ports/users.service.interface";
import { IUser } from "./types/users";

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
      } catch (err: any) {
        set({ error: err.message ?? "Error fetching users", loading: false });
      }
    },

    async createUser(name: string) {
      try {
        const newUser = await usersService.create({ name });
        set((state) => ({ users: [...state.users, newUser] }));
      } catch (err: any) {
        set({ error: err.message ?? "Error creating user" });
      }
    },
  }));
}

export const useUsersStore = createUsersStore(
  new HttpUsersService(new FetchHttpClient("http://localhost:8000/api"))
);
