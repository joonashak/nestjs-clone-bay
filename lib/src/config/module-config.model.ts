import { IsString } from "class-validator";

/** `CloneBayModule` static configuration. */
export class ModuleConfig {
  constructor(init?: Partial<ModuleConfig>) {
    Object.assign(this, init);
  }

  @IsString()
  afterLoginUrl = "/";
}
