import { Module } from "@nestjs/common";
import { ID_GENERATOR } from "./ports/id-generator.interface";
import { IDGeneratorProvider } from "./adapters/id-generator";

@Module({
  imports: [],
  controllers: [],
  providers: [IDGeneratorProvider],
  exports: [ID_GENERATOR],
})
export class CoreModule {}
