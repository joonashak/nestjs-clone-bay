import { Injectable } from "@nestjs/common";
import { AuthenticatedEsiApiService } from "../authenticated-esi-api/authenticated-esi-api.service";

/**
 * Support for authenticated ESI API requests.
 *
 * @group Services
 */
@Injectable()
export class CloneBayEsiApiService {
  constructor(private apiService: AuthenticatedEsiApiService) {}

  async get(characterId: number, url: string) {
    return this.apiService.get(characterId, url);
  }
}
