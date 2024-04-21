import { Injectable } from "@nestjs/common";
import {
  AuthenticatedEsiApiService,
  RequestOptions,
} from "../authenticated-esi-api/authenticated-esi-api.service";

/**
 * Support for authenticated ESI API requests.
 *
 * @group Services
 */
@Injectable()
export class CloneBayEsiApiService {
  constructor(private apiService: AuthenticatedEsiApiService) {}

  async get(options: RequestOptions) {
    return this.apiService.request("get", options);
  }

  async post(options: RequestOptions) {
    return this.apiService.request("post", options);
  }

  async put(options: RequestOptions) {
    return this.apiService.request("put", options);
  }

  async delete(options: RequestOptions) {
    return this.apiService.request("delete", options);
  }
}
