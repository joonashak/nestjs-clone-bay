import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { merge } from "lodash";
import { Model } from "mongoose";
import { PartialDeep } from "type-fest";
import { DYNAMIC_CONFIG_CACHE_KEY } from "../constants";
import { DynamicConfig, DynamicConfigDocument } from "./dynamic-config.model";

/** Provides configuration that can change during run time. */
@Injectable()
export class DynamicConfigService {
  private readonly logger = new Logger(DynamicConfigService.name);

  constructor(
    @InjectModel(DynamicConfig.name)
    private dynamicConfigModel: Model<DynamicConfigDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async get(): Promise<DynamicConfig> {
    const cached = await this.cacheManager.get<DynamicConfig>(
      DYNAMIC_CONFIG_CACHE_KEY,
    );

    if (!cached) {
      const dynamicConfig = await this.dynamicConfigModel.findOne();
      this.cacheManager.set(DYNAMIC_CONFIG_CACHE_KEY, dynamicConfig);
      return dynamicConfig;
    }

    return cached;
  }

  private async update(configUpdate: PartialDeep<DynamicConfig>) {
    await this.cacheManager.del(DYNAMIC_CONFIG_CACHE_KEY);
    const current = await this.dynamicConfigModel.findOne();
    merge(current, configUpdate);
    return this.dynamicConfigModel.findOneAndUpdate({}, current, { new: true });
  }

  /* API methods. */

  async setAllowedCharacters(allowedCharacters: number[]) {
    return this.update({ allowedCharacters });
  }

  async setAllowedCorporations(allowedCorporations: number[]) {
    return this.update({ allowedCorporations });
  }

  async setAllowedAlliances(allowedAlliances: number[]) {
    return this.update({ allowedAlliances });
  }
}
