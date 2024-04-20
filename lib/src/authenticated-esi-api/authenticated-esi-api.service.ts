import { Injectable } from "@nestjs/common";
import axios from "axios";
import { TokenService } from "../entities/user/token.service";
import { UnsafeEsiUrlException } from "../exceptions/unsafe-esi-url.exception";

export type GetOptions = {
  characterEveId: number;
  url: string;
  userId?: string;
  allowUnsafeUrl?: boolean;
  /** Must be explicitly set to `true` if user ID is not given. */
  allowAnyCharacter?: boolean;
};

const defaultGetOptions = {
  allowUnsafeUrl: false,
  allowAnyCharacter: false,
};

@Injectable()
export class AuthenticatedEsiApiService {
  constructor(private tokenService: TokenService) {}

  async get(getOptions: GetOptions) {
    const options = { ...defaultGetOptions, ...getOptions };
    this.assertUrlIsSafe(options.url, options.allowUnsafeUrl);

    const token = await this.getAccessToken(options);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    };

    try {
      const res = await axios.get(options.url, axiosConfig);
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

      const res = await axios.get(options.url, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
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
  private async getAccessToken(options: GetOptions) {
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
}
