import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Global, Module } from "@nestjs/common";
import { CloneBayModuleDefinition } from "./clone-bay.module-definition";
import { CharacterModule } from "./entities/character/character.module";
import { SsoController } from "./sso.controller";

/** @group Modules */
@Global()
@Module({
  imports: [SsoModule, CharacterModule],
  controllers: [SsoController],
})
export class CloneBayModule extends CloneBayModuleDefinition {}
