import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { CharacterModule } from "../entities/character/character.module";
import { UserModule } from "../entities/user/user.module";
import { AuthenticationAllowlistService } from "./authentication-allowlist.service";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [CharacterModule, ConfigModule, UserModule],
  providers: [AuthenticationService, AuthenticationAllowlistService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
