import { Inject, Injectable } from "@nestjs/common";
import { validateSync } from "class-validator";
import { CloneBayModuleOptions } from "../clone-bay-module-options.interface";
import { CLONE_BAY_MODULE_OPTIONS_TOKEN } from "../clone-bay.module-definition";
import { InvalidConfigurationException } from "../exceptions/invalid-configuration.exception";
import { ModuleConfig } from "./module-config.model";

@Injectable()
export class ModuleConfigService {
  public readonly config: ModuleConfig;

  constructor(@Inject(CLONE_BAY_MODULE_OPTIONS_TOKEN) options: CloneBayModuleOptions) {
    this.config = new ModuleConfig(options);
    // Running validation here ensures that execution is stopped immediately upon bad config.
    const errors = validateSync(this.config);

    if (errors.length) {
      throw new InvalidConfigurationException();
    }
  }
}
