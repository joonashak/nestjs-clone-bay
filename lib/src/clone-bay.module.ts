import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticatedEsiApiModule } from "./authenticated-esi-api/authenticated-esi-api.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthorizationModule } from "./authorization/authorization.module";
import { CloneBayCoreModule } from "./clone-bay-core.module";
import { CloneBayModuleOptions } from "./clone-bay-module-options.interface";
import { UserModule } from "./entities/user/user.module";

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
      imports: [UserModule, AuthenticationModule, AuthenticatedEsiApiModule, AuthorizationModule],
      exports: [UserModule, AuthenticationModule, AuthenticatedEsiApiModule, AuthorizationModule],
    };
  }
}
