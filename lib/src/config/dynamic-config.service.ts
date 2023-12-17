import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { merge } from "lodash";
import { Model } from "mongoose";
import { PartialDeep } from "type-fest";
import { CacheService } from "../cache/cache.service";
import { DYNAMIC_CONFIG_CACHE_KEY } from "../constants";
import { DynamicConfig, DynamicConfigDocument } from "./dynamic-config.model";

/** Provides configuration that can change during run time. */
@Injectable()
export class DynamicConfigService {
  private readonly logger = new Logger(DynamicConfigService.name);

  constructor(
    @InjectModel(DynamicConfig.name)
    private dynamicConfigModel: Model<DynamicConfigDocument>,
    private cacheService: CacheService,
  ) {}

  async get(): Promise<DynamicConfig> {
    return this.cacheService.wrap(DYNAMIC_CONFIG_CACHE_KEY, async () =>
      this.dynamicConfigModel.findOne(),
    );
  }

  private async update(configUpdate: PartialDeep<DynamicConfig>) {
    await this.cacheService.del(DYNAMIC_CONFIG_CACHE_KEY);
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
