import { IUser } from "../../users/models/user";
import { ITask } from "../../tasks/models/task";

export const FIXTURES_LOADER_TOKEN = Symbol("FIXTURES_LOADER_TOKEN");

export interface FixtureMap {
  tasks?: ITask[];
  users?: IUser[];
}

export interface IFixturesLoader {
  load(fixtureMap: FixtureMap): Promise<void>;
  purge(): Promise<void>;
}
