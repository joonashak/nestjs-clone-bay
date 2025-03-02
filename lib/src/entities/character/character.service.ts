import { Injectable } from "@nestjs/common";
import { EsiService } from "../../esi/esi.service";
import { Alliance } from "../alliance/alliance.model";
import { Corporation } from "../corporation/corporation.model";
import { Character } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(private esiService: EsiService) {}

  /**
   * Returns given Character with public information from ESI added.
   *
   * @param character Partial character object where fields populated by this
   *   function are not required.
   */
  async addPublicInfoFromEsi(
    character: Omit<Character, "corporation" | "name">,
  ): Promise<Character> {
    const { corporation_id: corporationId, name: characterName } =
      await this.esiService.getCharacterPublicInfo(character.eveId);

    const { alliance_id: allianceId, ...esiCorporation } =
      await this.esiService.getCorporationPublicInfo(corporationId);
    const corporation: Corporation = {
      eveId: corporationId,
      name: esiCorporation.name,
      ticker: esiCorporation.ticker,
    };

    let alliance: Alliance = null;
    if (allianceId) {
      const esiAlliance = await this.esiService.getAlliancePublicInfo(allianceId);
      alliance = {
        eveId: allianceId,
        name: esiAlliance.name,
        ticker: esiAlliance.ticker,
      };
    }

    return {
      ...character,
      name: characterName,
      corporation,
      alliance,
    };
  }
}
