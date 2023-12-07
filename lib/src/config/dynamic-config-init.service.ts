import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DynamicConfig, DynamicConfigDocument } from "./dynamic-config.model";

/** Initialization for dynamic configuration "singleton". */
@Injectable()
export class DynamicConfigInitService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DynamicConfigInitService.name);

  constructor(
    @InjectModel(DynamicConfig.name)
    private dynamicConfigModel: Model<DynamicConfigDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.initialize();
  }

  /**
   * Create default `DynamicConfig` object, if it does not exists. Throw, if
   * multiple found.
   */
  private async initialize(): Promise<void> {
    const current = await this.dynamicConfigModel.find();

    if (current.length === 0) {
      this.logger.log("Writing default configuration as none was found.");
      // Create with default values from model.
      await this.dynamicConfigModel.create({});
    }

    if (current.length > 1) {
      this.logger.error(
        "Multiple configuration objects found. Maximum of one is supported. You must resolve this issue manually as nestjs-clone-bay will not remove the extra objects to avoid data loss.",
      );
      throw new InternalServerErrorException("Server misconfiguration.");
    }
  }
}
