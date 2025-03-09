import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CacheModule } from "../cache/cache.module";
import { CloneBayModuleOptions } from "../clone-bay-module-options.interface";
import { CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN } from "../constants";
import { DynamicConfigInitService } from "./dynamic-config-init.service";
import { DynamicConfig, DynamicConfigSchema } from "./dynamic-config.model";
import { DynamicConfigService } from "./dynamic-config.service";
import { ModuleConfigService } from "./module-config.service";

@Module({})
export class ConfigModule {
  static register(options: CloneBayModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        MongooseModule.forFeature([{ name: DynamicConfig.name, schema: DynamicConfigSchema }]),
        CacheModule,
      ],
      providers: [
        {
          provide: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
          useValue: options,
        },
        ModuleConfigService,
        DynamicConfigInitService,
        DynamicConfigService,
      ],
      exports: [ModuleConfigService, MongooseModule, DynamicConfigService],
    };
  }
}
