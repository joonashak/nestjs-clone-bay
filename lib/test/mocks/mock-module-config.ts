import { ModuleConfig } from "../../src/config/module-config.model";
import { ModuleConfigService } from "../../src/config/module-config.service";
import { provideMockService } from "./mock-services";

export const defaultMockConfiguration: ModuleConfig = {
  afterLoginUrl: "/",
  esiBaseUrl: "",
};

export const provideMockModuleConfigService = (
  override: Partial<ModuleConfig> = {},
) =>
  provideMockService(ModuleConfigService)({
    config: {
      ...defaultMockConfiguration,
      ...override,
    },
  });
