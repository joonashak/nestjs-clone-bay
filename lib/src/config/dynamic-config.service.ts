import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { merge } from "lodash";
import { Model } from "mongoose";
import { PartialDeep } from "type-fest";
import { CacheService } from "../cache/cache.service";
import { DYNAMIC_CONFIG_CACHE_KEY } from "../constants";
import { DynamicConfig, DynamicConfigDocument } from "./dynamic-config.model";
import { ModuleConfigService } from "./module-config.service";

/** Provides configuration that can change during run time. */
@Injectable()
export class DynamicConfigService {
  private readonly logger = new Logger(DynamicConfigService.name);

  constructor(
    @InjectModel(DynamicConfig.name)
    private dynamicConfigModel: Model<DynamicConfigDocument>,
    private cacheService: CacheService,
    private moduleConfigService: ModuleConfigService,
  ) {}

  /**
   * Current dynamic application configuration.
   *
   * Note that static module configuration may be used to override dynamic
   * configuration values.
   */
  async get(): Promise<DynamicConfig> {
    const dynamicConfig = await this.cacheService.wrap(
      DYNAMIC_CONFIG_CACHE_KEY,
      async () => (await this.dynamicConfigModel.findOne()).toObject(),
    );

    const configWithOverrides = {
      ...dynamicConfig,
      ...this.moduleConfigService.config.dynamicConfigOverride,
    };
    return configWithOverrides;
  }

  private async update(configUpdate: PartialDeep<DynamicConfig>) {
    await this.cacheService.del(DYNAMIC_CONFIG_CACHE_KEY);
    const current = await this.dynamicConfigModel.findOne();
    merge(current, configUpdate);
    return this.dynamicConfigModel.findOneAndUpdate({}, current, { new: true });
  }

  /* API methods. */

  async setAllowedCharacters(allowedCharacters: number[]) {
    this.logger.log("Allowed characters updated.");
    return this.update({ allowedCharacters });
  }

  async setAllowedCorporations(allowedCorporations: number[]) {
    this.logger.log("Allowed corporations updated.");
    return this.update({ allowedCorporations });
  }

  async setAllowedAlliances(allowedAlliances: number[]) {
    this.logger.log("Allowed alliances updated.");
    return this.update({ allowedAlliances });
  }
}
