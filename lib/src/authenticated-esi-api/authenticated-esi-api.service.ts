import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { TokenService } from "../entities/user/token.service";
import { UnsafeEsiUrlException } from "../exceptions/unsafe-esi-url.exception";

export type RequestOptions = {
  characterEveId: number;
  url: string;
  userId?: string;
  data?: object;
  axiosConfig?: AxiosRequestConfig;
  allowUnsafeUrl?: boolean;
  /** Must be explicitly set to `true` if user ID is not given. */
  allowAnyCharacter?: boolean;
};

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

  async request(method: RequestMethods, getOptions: RequestOptions) {
    const options = { ...defaultOptions, ...getOptions };
    this.assertUrlIsSafe(options.url, options.allowUnsafeUrl);

    const token = await this.getAccessToken(options);

    try {
      const res = await this.executeRequest(method, token.accessToken, options);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response.status !== 403 ||
        error.response.data.error !== "token is expired"
      ) {
        throw error;
      }

      const newToken = await this.tokenService.refreshToken(
        options.characterEveId,
      );

      const res = await this.executeRequest(method, newToken, options);
      return res;
    }
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
  private async getAccessToken(options: RequestOptions) {
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

  private async executeRequest(
    method: RequestMethods,
    accessToken: string,
    options: RequestOptions,
  ) {
    const config = {
      ...options.axiosConfig,
      headers: {
        ...options.axiosConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = {
      get: async () => axios.get(options.url, config),
      post: async () => axios.post(options.url, options.data, config),
      put: async () => axios.put(options.url, options.data, config),
      delete: async () => axios.delete(options.url, config),
    };

    return request[method]();
  }
}
