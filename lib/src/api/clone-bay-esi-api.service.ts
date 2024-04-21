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

  async get<T>(options: RequestOptions) {
    return this.apiService.request<T>("get", options);
  }

  async post<T>(options: RequestOptions) {
    return this.apiService.request<T>("post", options);
  }

  async put<T>(options: RequestOptions) {
    return this.apiService.request<T>("put", options);
  }

  async delete<T>(options: RequestOptions) {
    return this.apiService.request<T>("delete", options);
  }
}
