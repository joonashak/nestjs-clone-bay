import { DynamicModule, Module } from "@nestjs/common";
import { CloneBayModuleOptions } from "../clone-bay-module-options.interface";
import { CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN } from "../constants";
import { ModuleConfigService } from "./module-config.service";

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: DynamicConfig.name, schema: DynamicConfigSchema }]),
//     CacheModule,
//   ],
//   providers: [DynamicConfigService, DynamicConfigInitService, ModuleConfigService],
//   exports: [DynamicConfigService, MongooseModule, ModuleConfigService],
// })
@Module({})
export class ConfigModule {
  static register(options: CloneBayModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
          useValue: options,
        },
        ModuleConfigService,
      ],
      exports: [ModuleConfigService],
    };
  }
}
