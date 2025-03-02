import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { ModuleConfigService } from "../config/module-config.service";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPortraitUrl,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "./esi.types";

@Injectable()
export class EsiService {
  private readonly logger = new Logger(EsiService.name);

  constructor(private configService: ModuleConfigService) {}

  async getAlliancePublicInfo(allianceId: number): Promise<EsiAlliancePublicInfo> {
    const url = this.makeUrl("v4", "alliances", allianceId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiAlliancePublicInfo>(url);
    return res.data;
  }

  async getCharacterPortraitUrl(characterId: number): Promise<EsiCharacterPortraitUrl> {
    const url = this.makeUrl("v3", "characters", characterId.toString(), "portrait");
    this.logRequest(url);
    const res = await axios.get<EsiCharacterPortraitUrl>(url);
    return res.data;
  }

  async getCharacterPublicInfo(characterId: number): Promise<EsiCharacterPublicInfo> {
    const url = this.makeUrl("v5", "characters", characterId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiCharacterPublicInfo>(url);
    return res.data;
  }

  async getCorporationPublicInfo(corporationId: number): Promise<EsiCorporationPublicInfo> {
    const url = this.makeUrl("v5", "corporations", corporationId.toString());
    this.logRequest(url);
    const res = await axios.get<EsiCorporationPublicInfo>(url);
    return res.data;
  }

  private logRequest(url: string): void {
    this.logger.verbose(`ESI request: ${url}`);
  }

  private makeUrl(...parts: string[]): string {
    const baseUrl = this.configService.config.esiBaseUrl;
    return `${[baseUrl, ...parts].join("/")}/`;
  }
}
