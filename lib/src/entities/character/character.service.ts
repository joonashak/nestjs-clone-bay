import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EsiService } from "../../esi/esi.service";
import { Alliance } from "../alliance/alliance.model";
import { Corporation } from "../corporation/corporation.model";
import { Character, CharacterDocument } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    private esiService: EsiService,
  ) {}

  async create(character: Character): Promise<Character> {
    return this.characterModel.create(character);
  }

  async findOneByEveId(eveId: number): Promise<Character | null> {
    return this.characterModel.findOne({ eveId });
  }

  async update({ eveId, ...character }: Character): Promise<Character> {
    return this.characterModel.findOneAndUpdate({ eveId }, character, {
      new: true,
    });
  }

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
      const esiAlliance =
        await this.esiService.getAlliancePublicInfo(allianceId);
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
