import { DynamicConfig } from "./config/dynamic-config.model";

/** @group Types */
export interface CloneBayModuleOptions {
  /** URL whereto redirect user after successful login. */
  afterLoginUrl?: string;

  /**
   * Override dynamic configuration values.
   *
   * Use dynamic configuration easily when developing or if you don't need the
   * config values to change during run time. Given options completely override
   * their dynamic counterparts.
   */
  dynamicConfigOverride?: Partial<DynamicConfig>;
}
