import { Injectable } from "@nestjs/common";
import axios from "axios";
import { TokenService } from "../entities/user/token.service";
import { UnsafeEsiUrlException } from "../exceptions/unsafe-esi-url.exception";

type GetOptions = {
  allowUnsafeUrl: boolean;
};

const defaultGetOptions: GetOptions = {
  allowUnsafeUrl: false,
};

@Injectable()
export class AuthenticatedEsiApiService {
  constructor(private tokenService: TokenService) {}

  async get(
    characterId: number,
    url: string,
    options: Partial<GetOptions> = {},
  ) {
    options = { ...defaultGetOptions, ...options };
    this.assertUrlIsSafe(url, options.allowUnsafeUrl);

    const token =
      await this.tokenService.findAccessTokenByCharacterId(characterId);

    return axios.get(url, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
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
}
