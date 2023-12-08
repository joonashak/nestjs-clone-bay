import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Global, Module } from "@nestjs/common";
import { CloneBayConfigService } from "./api/clone-bay-config.service";
import { CloneBayModuleDefinition } from "./clone-bay.module-definition";
import { ConfigModule } from "./config/config.module";
import { CharacterModule } from "./entities/character/character.module";
import { SsoController } from "./sso.controller";

/** @group Modules */
@Global()
@Module({
  imports: [ConfigModule, SsoModule, CharacterModule],
  controllers: [SsoController],
  providers: [CloneBayConfigService],
  exports: [CloneBayConfigService],
})
export class CloneBayModule extends CloneBayModuleDefinition {}
