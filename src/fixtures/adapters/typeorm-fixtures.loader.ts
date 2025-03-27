import { DataSource } from "typeorm";
import { type IFixturesLoader, type FixtureMap, FIXTURES_LOADER_TOKEN } from "../ports/fixtures-loader.interface";

export const TypeOrmFixturesLoaderProvider = {
  provide: FIXTURES_LOADER_TOKEN,
  useFactory: (dataSource: DataSource): IFixturesLoader => ({
    async load(fixtureMap: FixtureMap) {
      for (const [entityName, records] of Object.entries(fixtureMap)) {
        const entity = dataSource.getMetadata(entityName)?.target;
        if (!entity) {
          throw new Error(`Unknown entity: ${entityName}`);
        }
        await dataSource.getRepository(entity).save(records);
      }
    },
    async purge() {
      await dataSource.synchronize(true);
    },
  }),
  inject: [DataSource],
};
