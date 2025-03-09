import { Injectable } from "@nestjs/common";
import { ModuleConfigService } from "../config/module-config.service";

/**
 * Depends on configuration.
 */
@Injectable()
export class RemoveMeService {
  constructor(private configService: ModuleConfigService) {}

  async doSomethingBasedOnConfig() {
    return this.configService.config.afterLoginUrl;
  }
}
