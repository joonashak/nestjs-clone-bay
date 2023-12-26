import { Injectable } from "@nestjs/common";
import { DynamicConfig } from "../config/dynamic-config.model";
import { DynamicConfigService } from "../config/dynamic-config.service";

// FIXME: Should this be a module..?

/**
 * Control `nestjs-clone-bay` configuration during run time.
 *
 * This service exposes methods for controlling dynamic configuration. The
 * dynamic configuration is persisted over app restarts, but unlike static
 * configuration, does not require app restart to take effect.
 *
 * Changes made to dynamic configuration via this service take effect
 * immediately.
 *
 * @group Services
 */
@Injectable()
export class CloneBayConfigService {
  /** @ignore */
  constructor(private dynamicConfigService: DynamicConfigService) {}

  /** Get current dynamic configuration. */
  async getDynamicConfig(): Promise<DynamicConfig> {
    return this.dynamicConfigService.get();
  }

  /**
   * Set authentication allowlist of characters.
   *
   * Authentication is allowed if authenticating character is included in this
   * allowlist.
   *
   * @param allowedCharacters EVE ID's of allowed characters.
   */
  async setAllowedCharacters(allowedCharacters: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedCharacters(allowedCharacters);
  }

  /**
   * Set authentication allowlist of corporations.
   *
   * Authentication is allowed if authenticating character is a member of a
   * corporation included in this allowlist.
   *
   * @param allowedCorporations EVE ID's of allowed corporations.
   */
  async setAllowedCorporations(allowedCorporations: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedCorporations(allowedCorporations);
  }

  /**
   * Set authentication allowlist of alliances.
   *
   * Authentication is allowed if authenticating character is a member of an
   * alliance included in this allowlist.
   *
   * @param allowedAlliances EVE ID's of allowed alliances.
   */
  async setAllowedAlliances(allowedAlliances: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedAlliances(allowedAlliances);
  }
}
