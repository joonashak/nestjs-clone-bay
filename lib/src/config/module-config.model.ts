import { IsString } from "class-validator";
import { DynamicConfig } from "./dynamic-config.model";

/** `CloneBayModule` static configuration. */
export class ModuleConfig {
  constructor(init?: Partial<ModuleConfig>) {
    Object.assign(this, init);
  }

  @IsString()
  afterLoginUrl = "/";

  dynamicConfigOverride?: Partial<DynamicConfig> = {};
}
