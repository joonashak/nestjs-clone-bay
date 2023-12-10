import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPortraitUrl,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "./esi.types";

const baseUrl = "https://esi.evetech.net";
const url = (...parts: string[]): string => `${[baseUrl, ...parts].join("/")}/`;

@Injectable()
export class EsiService {
  async getAlliancePublicInfo(
    allianceId: number,
  ): Promise<EsiAlliancePublicInfo> {
    const res = await axios.get<EsiAlliancePublicInfo>(
      url("v4", "alliances", allianceId.toString()),
    );
    return res.data;
  }

  async getCharacterPortraitUrl(
    characterId: number,
  ): Promise<EsiCharacterPortraitUrl> {
    const res = await axios.get<EsiCharacterPortraitUrl>(
      url("v3", "characters", characterId.toString(), "portrait"),
    );
    return res.data;
  }

  async getCharacterPublicInfo(
    characterId: number,
  ): Promise<EsiCharacterPublicInfo> {
    const res = await axios.get<EsiCharacterPublicInfo>(
      url("v5", "characters", characterId.toString()),
    );
    return res.data;
  }

  async getCorporationPublicInfo(
    corporationId: number,
  ): Promise<EsiCorporationPublicInfo> {
    const res = await axios.get<EsiCorporationPublicInfo>(
      url("v5", "corporations", corporationId.toString()),
    );
    return res.data;
  }
}
