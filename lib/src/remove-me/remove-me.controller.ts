import { Controller, Get } from "@nestjs/common";
import { ModuleConfigService } from "../config/module-config.service";

@Controller()
export class RemoveMeController {
  constructor(private moduleConfig: ModuleConfigService) {}

  @Get("asd")
  async asd() {
    return this.moduleConfig.config;
  }
}
