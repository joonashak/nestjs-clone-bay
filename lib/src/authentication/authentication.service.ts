import { Injectable } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";
import { CharacterService } from "../entities/character/character.service";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

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
  ) {}

  async authenticate(characterEveId: number, tokens: SsoTokens): Promise<User> {
    const esiCharacter = await this.characterService.addPublicInfoFromEsi({
      eveId: characterEveId,
      ...tokens,
    });

    // TODO: Apply authentication allowlists.
    // TODO: Check if new users are accepted.

    const user = await this.userService.findByCharacterEveId(
      esiCharacter.eveId,
    );

    if (user) {
      return this.userService.updateCharacter(user, esiCharacter);
    }

    return this.userService.create({ main: esiCharacter });
  }
}
