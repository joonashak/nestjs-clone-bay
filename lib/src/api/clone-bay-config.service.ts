import { Injectable } from "@nestjs/common";
import { DynamicConfigService } from "../config/dynamic-config.service";

@Injectable()
export class CloneBayConfigService {
  constructor(private dynamicConfigService: DynamicConfigService) {}

  async test() {
    const asd = await this.dynamicConfigService.get();
    console.log(asd);
  }
}
