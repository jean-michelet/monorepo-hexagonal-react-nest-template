import { ID_GENERATOR, IIDGenerator } from "../ports/id-generator.interface";

export class StubIDGenerator implements IIDGenerator {
  generate(): string {
    return "id-1";
  }
}
