
export const ID_GENERATOR = Symbol("USERS_REPOSITORY_TOKEN");

export interface IIDGenerator {
  generate(): string;
}
