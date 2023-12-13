import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { CharacterModule } from "../entities/character/character.module";
import { UserModule } from "../entities/user/user.module";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [CharacterModule, ConfigModule, UserModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
