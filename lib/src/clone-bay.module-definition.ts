import { ConfigurableModuleBuilder } from "@nestjs/common";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import {
  CLONE_BAY_MODULE_NAME,
  CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
} from "./constants";

export const {
  ConfigurableModuleClass: CloneBayModuleDefinition,
  /** @group Constants */
  MODULE_OPTIONS_TOKEN: CLONE_BAY_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<CloneBayModuleOptions>({
  moduleName: CLONE_BAY_MODULE_NAME,
  optionsInjectionToken: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
})
  .setClassMethodName("forRoot")
  .build();
