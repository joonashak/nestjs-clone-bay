import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { CloneBayConfigService } from "./api/clone-bay-config.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CloneBayModuleDefinition } from "./clone-bay.module-definition";
import { ConfigModule } from "./config/config.module";
import { CharacterModule } from "./entities/character/character.module";
import { UserModule } from "./entities/user/user.module";
import { EsiModule } from "./esi/esi.module";
import { SsoController } from "./sso.controller";

/** @group Modules */
@Global()
@Module({
  imports: [
    AuthenticationModule,
    CacheModule.register({ ttl: 5000, isGlobal: true }),
    CharacterModule,
    ConfigModule,
    EsiModule,
    SsoModule,
    UserModule,
  ],
  controllers: [SsoController],
  providers: [CloneBayConfigService],
  exports: [CloneBayConfigService, UserModule, AuthenticationModule],
})
export class CloneBayModule extends CloneBayModuleDefinition {}
