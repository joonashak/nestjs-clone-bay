import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { CharacterModule } from "../entities/character/character.module";
import { SsoController } from "./sso.controller";
import { SsoService } from "./sso.service";

/**
 * Ready-to-use HTTP implementation for EVE SSO login.
 *
 * Declares a controller with the HTTP endpoints necessary to implement EVE SSO
 * login. This module is a convenience that you can import in your app to easily
 * implement EVE SSO login. Also serves as an example for custom
 * implementations.
 *
 * @group Modules
 */
@Module({
  imports: [SsoModule, CharacterModule],
  providers: [SsoService],
  controllers: [SsoController],
})
export class CloneBaySsoModule {}
