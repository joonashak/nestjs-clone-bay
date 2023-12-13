import { Injectable } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";
import { Character } from "../entities/character/character.model";

@Injectable()
export class AuthenticationAllowlistService {
  constructor(private dynamicConfigService: DynamicConfigService) {}

  /**
   * Check if character passes authentication allowlists.
   *
   * Match against any allowlist is considered a pass. If all allowlists are
   * empty, any character is allowed. Allowlists are by character, corporation
   * and alliance.
   *
   * Note that this does not consider the characters main/alt status (or
   * anything else besides the allowlists).
   */
  async allowed(character: Character): Promise<boolean> {
    const { allowedCharacters, allowedCorporations, allowedAlliances } =
      await this.dynamicConfigService.get();

    if (
      allowedCharacters.length === 0 &&
      allowedCorporations.length === 0 &&
      allowedAlliances.length === 0
    ) {
      return true;
    }

    if (allowedCharacters.includes(character.eveId)) {
      return true;
    }

    if (allowedCorporations.includes(character.corporation.eveId)) {
      return true;
    }

    if (
      character.alliance &&
      allowedAlliances.includes(character.alliance.eveId)
    ) {
      return true;
    }

    return false;
  }
}
