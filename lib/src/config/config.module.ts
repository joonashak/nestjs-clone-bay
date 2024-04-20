import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DynamicConfigInitService } from "./dynamic-config-init.service";
import { DynamicConfig, DynamicConfigSchema } from "./dynamic-config.model";
import { DynamicConfigService } from "./dynamic-config.service";
import { ModuleConfigService } from "./module-config.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DynamicConfig.name, schema: DynamicConfigSchema },
    ]),
  ],
  providers: [
    DynamicConfigService,
    DynamicConfigInitService,
    ModuleConfigService,
  ],
  exports: [DynamicConfigService, MongooseModule, ModuleConfigService],
})
export class ConfigModule {}
