import { Injectable } from "@nestjs/common";
import {
  AuthenticatedEsiApiService,
  GetOptions,
} from "../authenticated-esi-api/authenticated-esi-api.service";

/**
 * Support for authenticated ESI API requests.
 *
 * @group Services
 */
@Injectable()
export class CloneBayEsiApiService {
  constructor(private apiService: AuthenticatedEsiApiService) {}

  async get(options: GetOptions) {
    return this.apiService.get(options);
  }
}
