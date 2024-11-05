import { ModuleDefinition } from "@nestjs/core/interfaces/module-definition.interface";
import { MockingModule } from "./mocking/mocking.module";

export const conditionalModules = (): ModuleDefinition[] => {
  if (process.env.UNSAFE_MOCKING_ENABLED === "true") {
    return [MockingModule];
  }
  return [];
};
