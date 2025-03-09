import { DynamicModule, Global, Module } from "@nestjs/common";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import { ConfigModule } from "./config/config.module";
import { CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN } from "./constants";
import { RemoveMeModule } from "./remove-me/remove-me.module";

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
  // Pass-through method to allow zero arguments.
  // static forRoot(options: CloneBayModuleOptions = {}) {
  //   return super.forRoot(options);
  // }

  // // Pass-through method to allow zero arguments.
  // static forRootAsync(
  //   options: ConfigurableModuleAsyncOptions<CloneBayModuleOptions, "create"> & Partial<object> = {},
  // ) {
  //   return super.forRootAsync(options);
  // }
  constructor() {}

  static forRoot(options: CloneBayModuleOptions = {}): DynamicModule {
    const moduleOptions = {
      provide: CLONE_BAY_MODULE_OPTIONS_INJECTION_TOKEN,
      useValue: options,
    };

    return {
      module: CloneBayCoreModule,
      imports: [ConfigModule.register(options), RemoveMeModule],
      providers: [moduleOptions],
      exports: [ConfigModule],
      // exports: [RemoveMeModule],
    };
  }
}
