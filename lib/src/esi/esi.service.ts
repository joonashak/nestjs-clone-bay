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
    allianceId: string,
  ): Promise<EsiAlliancePublicInfo> {
    const res = await axios.get<EsiAlliancePublicInfo>(
      url("v4", "alliances", allianceId),
    );
    return res.data;
  }

  async getCharacterPortraitUrl(
    characterId: string,
  ): Promise<EsiCharacterPortraitUrl> {
    const res = await axios.get<EsiCharacterPortraitUrl>(
      url("v3", "characters", characterId, "portrait"),
    );
    return res.data;
  }

  async getCharacterPublicInfo(
    characterId: string,
  ): Promise<EsiCharacterPublicInfo> {
    const res = await axios.get<EsiCharacterPublicInfo>(
      url("v5", "characters", characterId),
    );
    return res.data;
  }

  async getCorporationPublicInfo(
    corporationId: string,
  ): Promise<EsiCorporationPublicInfo> {
    const res = await axios.get<EsiCorporationPublicInfo>(
      url("v5", "corporations", corporationId),
    );
    return res.data;
  }
}
