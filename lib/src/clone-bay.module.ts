import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Global, Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CacheModule } from "./cache/cache.module";
import { CloneBayModuleDefinition } from "./clone-bay.module-definition";
import { ConfigModule } from "./config/config.module";
import { CharacterModule } from "./entities/character/character.module";
import { UserModule } from "./entities/user/user.module";
import { EsiModule } from "./esi/esi.module";

/** @group Modules */
@Global()
@Module({
  imports: [
    AuthenticationModule,
    CacheModule,
    CharacterModule,
    ConfigModule,
    EsiModule,
    SsoModule,
    UserModule,
  ],
  exports: [ConfigModule, UserModule, AuthenticationModule],
})
export class CloneBayModule extends CloneBayModuleDefinition {}
