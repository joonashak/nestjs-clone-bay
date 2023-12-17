import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPortraitUrl,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "./esi.types";

const baseUrl = "https://esi.evetech.net";
const makeUrl = (...parts: string[]): string =>
  `${[baseUrl, ...parts].join("/")}/`;

@Injectable()
export class EsiService {
  private readonly logger = new Logger(EsiService.name);

  async getAlliancePublicInfo(
    allianceId: number,
  ): Promise<EsiAlliancePublicInfo> {
    const url = makeUrl("v4", "alliances", allianceId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiAlliancePublicInfo>(url);
    return res.data;
  }

  async getCharacterPortraitUrl(
    characterId: number,
  ): Promise<EsiCharacterPortraitUrl> {
    const url = makeUrl("v3", "characters", characterId.toString(), "portrait");
    this.logRequest(url);
    const res = await axios.get<EsiCharacterPortraitUrl>(url);
    return res.data;
  }

  async getCharacterPublicInfo(
    characterId: number,
  ): Promise<EsiCharacterPublicInfo> {
    const url = makeUrl("v5", "characters", characterId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiCharacterPublicInfo>(url);
    return res.data;
  }

  async getCorporationPublicInfo(
    corporationId: number,
  ): Promise<EsiCorporationPublicInfo> {
    const url = makeUrl("v5", "corporations", corporationId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiCorporationPublicInfo>(url);
    return res.data;
  }

  private logRequest(url: string): void {
    this.logger.verbose(`ESI request: ${url}`);
  }
}
