import { DynamicConfig } from "./config/dynamic-config.model";

/** @group Types */
export interface CloneBayModuleOptions {
  /** URL whereto redirect user after successful login. */
  afterLoginUrl?: string;

  /**
   * Optionally override default ESI API host.
   *
   * Use this to direct ESI API calls to a custom host. Overrides only the host
   * part of URL. Useful for E2E testing.
   *
   * Note that this does not affect SSO authentication. That can be configured
   * via `nestjs-eve-auth` options.
   */
  esiBaseUrl?: string;

  /**
   * Override dynamic configuration values.
   *
   * Use dynamic configuration easily when developing or if you don't need the
   * config values to change during run time. Given options completely override
   * their dynamic counterparts.
   */
  dynamicConfigOverride?: Partial<DynamicConfig>;
}
