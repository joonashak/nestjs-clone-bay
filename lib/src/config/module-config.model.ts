import { IsUrl } from "class-validator";
import { DynamicConfig } from "./dynamic-config.model";

/**
 * `CloneBayModule` static configuration.
 */
export class ModuleConfig {
  constructor(init?: Partial<ModuleConfig>) {
    Object.assign(this, init);
  }

  @IsUrl({
    require_tld: false,
    require_host: false,
    protocols: ["http", "https"],
  })
  afterLoginUrl = "/";

  @IsUrl({
    require_tld: false,
    require_protocol: true,
    protocols: ["http", "https"],
  })
  esiBaseUrl = "https://esi.evetech.net";

  dynamicConfigOverride?: Partial<DynamicConfig> = {};
}
