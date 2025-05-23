import { DynamicModule, Global, Module } from "@nestjs/common";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import { ConfigModule } from "./config/config.module";
import { CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN } from "./constants";
import { MiddlewareModule } from "./middleware/middleware.module";
import { CloneBaySsoModule } from "./sso/clone-bay-sso.module";

/**
 * @group Modules
 */
@Global()
@Module({})
export class CloneBayCoreModule {
  static forRoot(options: CloneBayModuleOptions = {}): DynamicModule {
    const moduleOptions = {
      provide: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
      useValue: options,
    };

    return {
      module: CloneBayCoreModule,
      imports: [ConfigModule.register(options), CloneBaySsoModule, MiddlewareModule],
      providers: [moduleOptions],
      exports: [ConfigModule],
    };
  }
}
