import { Injectable } from "@nestjs/common";
import { DynamicConfig } from "../config/dynamic-config.model";
import { DynamicConfigService } from "../config/dynamic-config.service";

@Injectable()
export class CloneBayConfigService {
  constructor(private dynamicConfigService: DynamicConfigService) {}

  async getDynamicConfig(): Promise<DynamicConfig> {
    return this.dynamicConfigService.get();
  }

  async setAllowedCharacters(allowedCharacters: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedCharacters(allowedCharacters);
  }

  async setAllowedCorporations(allowedCorporations: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedCorporations(allowedCorporations);
  }

  async setAllowedAlliances(allowedAlliances: number[]): Promise<void> {
    await this.dynamicConfigService.setAllowedAlliances(allowedAlliances);
  }
}
