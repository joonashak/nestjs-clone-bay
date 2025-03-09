import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticatedEsiApiModule } from "./authenticated-esi-api/authenticated-esi-api.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthorizationModule } from "./authorization/authorization.module";
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
      imports: [
        RemoveMeModule,
        UserModule,
        AuthenticationModule,
        AuthenticatedEsiApiModule,
        AuthorizationModule,
      ],
      exports: [
        RemoveMeModule,
        UserModule,
        AuthenticationModule,
        AuthenticatedEsiApiModule,
        AuthorizationModule,
      ],
    };
  }
}
