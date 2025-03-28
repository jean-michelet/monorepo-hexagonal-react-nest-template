import { ITask } from "@avicenne/shared/tasks";
import { IUser } from "@avicenne/shared/users";


export const FIXTURES_LOADER_TOKEN = Symbol("FIXTURES_LOADER_TOKEN");

export interface FixtureMap {
  tasks?: ITask[];
  users?: IUser[];
}

export interface IFixturesLoader {
  load(fixtureMap: FixtureMap): Promise<void>;
  purge(): Promise<void>;
}
