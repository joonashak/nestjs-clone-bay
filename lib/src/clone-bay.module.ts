import { DynamicModule, Module } from "@nestjs/common";
import { CloneBayCoreModule } from "./clone-bay-core.module";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import { UserModule } from "./entities/user/user.module";
import { RemoveMeModule } from "./remove-me/remove-me.module";

@Module({})
export class CloneBayModule {
  static forRoot(options?: CloneBayModuleOptions): DynamicModule {
    return {
      module: CloneBayModule,
      imports: [CloneBayCoreModule.forRoot(options)],
      exports: [CloneBayCoreModule],
    };
  }

  static forChildren(): DynamicModule {
    return {
      module: CloneBayModule,
      imports: [RemoveMeModule, UserModule],
      exports: [RemoveMeModule, UserModule],
    };
  }
}
