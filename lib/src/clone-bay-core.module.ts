import { DynamicModule, Global, Module } from "@nestjs/common";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import { ConfigModule } from "./config/config.module";
import { CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN } from "./constants";

/**
 * @group Modules
 */
@Global()
// @Module({
//   imports: [
//     AuthenticationModule,
//     AuthorizationModule,
//     CacheModule,
//     CharacterModule,
//     ConfigModule,
//     EsiModule,
//     UserModule,
//     AuthenticatedEsiApiModule,
//     CloneBaySsoModule,
//   ],
//   exports: [
//     CLONE_BAY_MODULE_OPTIONS_TOKEN,
//     ConfigModule,
//     UserModule,
//     AuthenticationModule,
//     AuthorizationModule,
//     AuthenticatedEsiApiModule,
//     CacheModule,
//     UserModule,
//   ],
// })
@Module({})
export class CloneBayCoreModule {
  static forRoot(options: CloneBayModuleOptions = {}): DynamicModule {
    const moduleOptions = {
      provide: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
      useValue: options,
    };

    return {
      module: CloneBayCoreModule,
      imports: [ConfigModule.register(options)],
      providers: [moduleOptions],
      exports: [ConfigModule],
    };
  }
}
