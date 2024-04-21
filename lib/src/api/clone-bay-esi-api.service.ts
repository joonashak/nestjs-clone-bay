import { Injectable } from "@nestjs/common";
import { AuthenticatedEsiApiService } from "../authenticated-esi-api/authenticated-esi-api.service";
import { EsiApiRequestOptions } from "../types/esi-api-request-options.interface";

/**
 * Make authenticated ESI API requests.
 *
 * Includes methods for GET, POST, PUT, and DELETE requests. The requests are
 * authenticated. Upon failing due to an expired access token, they will
 * automatically refresh the tokens and retry the failed request.
 *
 * By default, the methods are limited to the ESI API URL and check that the
 * given character is owned by the given user. These protections can be turned
 * off in `EsiApiRequestOptions`.
 *
 * See {@link EsiApiRequestOptions} for method param types.
 *
 * @group Services
 */
@Injectable()
export class CloneBayEsiApiService {
  /** @ignore */
  constructor(private apiService: AuthenticatedEsiApiService) {}

  async get<T>(options: EsiApiRequestOptions) {
    return this.apiService.request<T>("get", options);
  }

  async post<T>(options: EsiApiRequestOptions) {
    return this.apiService.request<T>("post", options);
  }

  async put<T>(options: EsiApiRequestOptions) {
    return this.apiService.request<T>("put", options);
  }

  async delete<T>(options: EsiApiRequestOptions) {
    return this.apiService.request<T>("delete", options);
  }
}
