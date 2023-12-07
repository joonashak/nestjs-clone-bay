import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { merge } from "lodash";
import { Model } from "mongoose";
import { PartialDeep } from "type-fest";
import { DynamicConfig, DynamicConfigDocument } from "./dynamic-config.model";

/** Provides configuration that can change during run time. */
@Injectable()
export class DynamicConfigService {
  private readonly logger = new Logger(DynamicConfigService.name);

  constructor(
    @InjectModel(DynamicConfig.name)
    private dynamicConfigModel: Model<DynamicConfigDocument>,
  ) {}

  // TODO: Cache this.
  async get(): Promise<DynamicConfig> {
    return this.dynamicConfigModel.findOne();
  }

  // TODO: Invalidate cache.
  private async update(
    configUpdate: PartialDeep<DynamicConfig>,
  ): Promise<DynamicConfig> {
    const current = await this.get();
    merge(current, configUpdate);
    return this.dynamicConfigModel.findOneAndUpdate({}, current, { new: true });
  }
}
