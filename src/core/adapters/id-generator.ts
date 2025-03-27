import * as crypto from 'crypto'

import { ID_GENERATOR, IIDGenerator } from "../ports/id-generator.interface";

export class IDGenerator implements IIDGenerator {
  generate(): string {
    return crypto.randomUUID()
  }
}

export const IDGeneratorProvider = {
  provide: ID_GENERATOR,
  useClass: IDGenerator,
};