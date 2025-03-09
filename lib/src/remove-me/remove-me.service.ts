import { Injectable } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";
import { ModuleConfigService } from "../config/module-config.service";

/**
 * Depends on configuration.
 */
@Injectable()
export class RemoveMeService {
  constructor(
    private configService: ModuleConfigService,
    private dynamicConfig: DynamicConfigService,
  ) {}

  async doSomethingBasedOnConfig() {
    return this.configService.config.afterLoginUrl;
  }

  async doSomethingWithDynamicConfig() {
    return this.dynamicConfig.get();
  }
}
