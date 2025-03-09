import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { AuthenticationModule } from "../authentication/authentication.module";
import { CharacterModule } from "../entities/character/character.module";
import { UserModule } from "../entities/user/user.module";
import { SsoController } from "./sso.controller";
import { SsoService } from "./sso.service";

/**
 * EVE SSO login module.
 *
 * Declares a controller with the HTTP endpoints necessary to implement EVE SSO
 * login.
 *
 * @group Modules
 */
@Module({
  imports: [SsoModule, CharacterModule, AuthenticationModule, UserModule],
  providers: [SsoService],
  controllers: [SsoController],
})
export class CloneBaySsoModule {}
