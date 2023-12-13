import { ForbiddenException, Injectable } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";
import { Character } from "../entities/character/character.model";
import { CharacterService } from "../entities/character/character.service";
import { User, UserDocument } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";
import { AuthenticationAllowlistService } from "./authentication-allowlist.service";

type SsoTokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthenticationService {
  constructor(
    private dynamicConfigService: DynamicConfigService,
    private characterService: CharacterService,
    private userService: UserService,
    private allowlistService: AuthenticationAllowlistService,
  ) {}

  async authenticate(characterEveId: number, tokens: SsoTokens): Promise<User> {
    const esiCharacter = await this.characterService.addPublicInfoFromEsi({
      eveId: characterEveId,
      ...tokens,
    });

    const user = await this.userService.findByCharacterEveId(
      esiCharacter.eveId,
    );

    if (user) {
      const allowed = await this.existingUserCanAuthenticate(user);
      if (allowed) {
        return this.userService.updateCharacter(user, esiCharacter);
      }
    }

    if (await this.newUserCanAuthenticate(esiCharacter)) {
      return this.userService.create({ main: esiCharacter });
    }

    throw new ForbiddenException();
  }

  private async existingUserCanAuthenticate(
    user: UserDocument,
  ): Promise<boolean> {
    const { applyAllowlistsToExistingUsers } =
      await this.dynamicConfigService.get();

    if (!applyAllowlistsToExistingUsers) {
      return true;
    }

    // Authentication allowlist should be applied only to the main character.
    const allowlistPass = await this.allowlistService.allowed(user.main);

    if (allowlistPass === true) {
      return true;
    }

    return false;
  }

  private async newUserCanAuthenticate(character: Character): Promise<boolean> {
    const { allowNewUsers } = await this.dynamicConfigService.get();

    if (!allowNewUsers) {
      return false;
    }

    const allowlistPass = await this.allowlistService.allowed(character);

    if (allowlistPass === true) {
      return true;
    }

    return false;
  }
}
