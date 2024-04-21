import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { has } from "lodash";
import { TokenService } from "../entities/user/token.service";
import { UnsafeEsiUrlException } from "../exceptions/unsafe-esi-url.exception";
import { EsiApiRequestOptions } from "../types/esi-api-request-options.interface";

const defaultOptions = {
  allowUnsafeUrl: false,
  allowAnyCharacter: false,
  axiosConfig: {},
  data: {},
};

type RequestMethods = "get" | "post" | "put" | "delete";

@Injectable()
export class AuthenticatedEsiApiService {
  constructor(private tokenService: TokenService) {}

  async request<T>(method: RequestMethods, getOptions: EsiApiRequestOptions) {
    const options = { ...defaultOptions, ...getOptions };
    this.assertUrlIsSafe(options.url, options.allowUnsafeUrl);
    const { accessToken } = await this.getAccessToken(options);

    let response: AxiosResponse<T>;

    try {
      response = await this.executeRequest<T>(method, accessToken, options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!this.tokenHasExpired(error)) {
        throw error;
      }

      const newToken = await this.tokenService.refreshToken(
        options.characterEveId,
      );
      response = await this.executeRequest<T>(method, newToken, options);
    }

    return response;
  }

  /** Prevent leaking tokens accidentally. */
  private assertUrlIsSafe(url: string, allowUnsafeUrl: boolean) {
    if (allowUnsafeUrl) {
      return;
    }

    if (url.startsWith("https://esi.evetech.net/")) {
      return;
    }

    throw new UnsafeEsiUrlException();
  }

  /**
   * Safely get access token taking into account user ownership and other
   * settings.
   */
  private async getAccessToken(options: EsiApiRequestOptions) {
    if (!options.userId && options.allowAnyCharacter) {
      return this.tokenService.findAccessTokenByCharacterId(
        options.characterEveId,
      );
    }

    return this.tokenService.findAccessTokenByCharacterIdSafe(
      options.characterEveId,
      options.userId,
    );
  }

  private async executeRequest<T>(
    method: RequestMethods,
    accessToken: string,
    options: EsiApiRequestOptions,
  ) {
    const { axiosConfig, url, data } = options;
    const config = {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {
      get: async () => axios.get<T>(url, config),
      post: async () => axios.post<T>(url, data, config),
      put: async () => axios.put<T>(url, data, config),
      delete: async () => axios.delete<T>(url, config),
    };

    return request[method]();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tokenHasExpired(error: any): boolean {
    if (!has(error, "response") || !has(error, "response.data.error")) {
      return false;
    }

    return (
      error.response.status === 403 &&
      error.response.data.error === "token is expired"
    );
  }
}
