import { DynamicConfig } from "../../src/config/dynamic-config.model";
import { DynamicConfigService } from "../../src/config/dynamic-config.service";
import { provideMockService } from "./mock-services";

export const mockDynamicConfigDefaults = {
  allowedAlliances: [],
  allowedCorporations: [],
  allowedCharacters: [],
  allowNewUsers: true,
  applyAllowlistsToExistingUsers: false,
};

export const provideMockDynamicConfigService = provideMockService(DynamicConfigService);

export const mockDynamicConfig = (
  dynamicConfigService: DynamicConfigService,
  config: Partial<DynamicConfig>,
) => {
  jest
    .spyOn(dynamicConfigService, "get")
    .mockResolvedValue({ ...mockDynamicConfigDefaults, ...config });
};
