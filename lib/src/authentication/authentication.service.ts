import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";
import { Character } from "../entities/character/character.model";
import { UserDocument } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";
import { AuthenticationAllowlistService } from "./authentication-allowlist.service";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private dynamicConfigService: DynamicConfigService,
    private userService: UserService,
    private allowlistService: AuthenticationAllowlistService,
  ) {}

  async ssoLogin(esiCharacter: Character): Promise<UserDocument> {
    const user = await this.userService.findByCharacterEveId(esiCharacter.eveId);

    if (user) {
      const allowed = await this.existingUserCanAuthenticate(user);
      if (allowed) {
        return this.userService.updateCharacter(user, esiCharacter);
      }
    }

    if (await this.newUserCanAuthenticate(esiCharacter)) {
      const admin = (await this.userService.userCount()) === 0;
      return this.userService.create({ main: esiCharacter, alts: [], admin });
    }

    throw new ForbiddenException();
  }

  async existingUserCanAuthenticate(user: UserDocument): Promise<boolean> {
    const { applyAllowlistsToExistingUsers } = await this.dynamicConfigService.get();

    if (!applyAllowlistsToExistingUsers) {
      return true;
    }

    // Authentication allowlist should be applied only to the main character.
    const allowlistPass = await this.allowlistService.allowed(user.main);

    if (allowlistPass === true) {
      return true;
    }

    this.logger.log(
      `Existing user was refused authentication due to allowlist check. (userId=${user.id})`,
    );
    return false;
  }

  private async newUserCanAuthenticate(character: Character): Promise<boolean> {
    console.log("newUserCanAuthenticate", character);
    const config = await this.dynamicConfigService.get();
    console.log("config", config);
    const { allowNewUsers } = config;

    if (!allowNewUsers) {
      return false;
    }

    const allowlistPass = await this.allowlistService.allowed(character);

    if (allowlistPass === true) {
      return true;
    }

    this.logger.log(
      `New user was refused authentication due to allowlist check. (userId=${character.eveId})`,
    );
    return false;
  }
}
