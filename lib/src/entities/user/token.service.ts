import { SsoService } from "@joonashak/nestjs-eve-auth";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { decode } from "jsonwebtoken";
import { Model } from "mongoose";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
    private ssoService: SsoService,
  ) {}

  async findAccessTokens(userId: string): Promise<EveAccessToken[]> {
    const { main, alts } =
      await this.userCacheService.findWithAccessTokens(userId);

    const accessTokens: EveAccessToken[] = alts.map(
      ({ eveId, accessToken }) => ({
        eveId,
        accessToken,
      }),
    );

    accessTokens.push({
      eveId: main.eveId,
      accessToken: main.accessToken,
    });

    return accessTokens;
  }

  /** Check given access token's expiry, refreshing, if necessary. */
  async useToken(accessToken: string): Promise<string> {
    if (this.tokenIsAlive(accessToken)) {
      const characterEveId = this.getCharacterEveId(accessToken);
      return this.refreshToken(characterEveId);
    }

    return accessToken;
  }

  /**
   * Refresh SSO tokens for character.
   *
   * New tokens are saved after refreshing and the new access token returned.
   */
  async refreshToken(characterEveId: number): Promise<string> {
    const user = await this.findUserWithTokens(characterEveId);
    const character = this.getCharacter(user, characterEveId);

    const tokens = await this.ssoService.refreshTokens(character.refreshToken);

    character.accessToken = tokens.accessToken;
    character.refreshToken = tokens.refreshToken;
    user.markModified("alts");
    await user.save();
    await this.userCacheService.invalidateForUser(user);

    return tokens.accessToken;
  }

  private tokenIsAlive(accessToken: string): boolean {
    const decodedToken = decode(accessToken);
    const expiry = dayjs.unix(decodedToken["exp"]);
    return expiry.isAfter();
  }

  private getCharacterEveId(accessToken: string): number {
    const decodedToken = decode(accessToken);

    const characterEveId = Number(decodedToken.sub.toString().split(":")[2]);

    if (!characterEveId) {
      throw new InternalServerErrorException(
        "Could not find character EVE ID from access token.",
      );
    }

    return characterEveId;
  }

  /** Revoke all refresh tokens for user. */
  async revokeTokens(user: User): Promise<void> {
    user = await this.findUserWithTokens(user.main.eveId);
    const refreshTokens = user.alts.map((alt) => alt.refreshToken);
    refreshTokens.push(user.main.refreshToken);
    await Promise.all(
      refreshTokens.map((token) => this.ssoService.revokeRefreshToken(token)),
    );
  }

  private async findUserWithTokens(
    characterEveId: number,
  ): Promise<UserDocument> {
    return this.userModel
      .findOne({
        $or: [
          { "main.eveId": characterEveId },
          { "alts.eveId": characterEveId },
        ],
      })
      .populate("main.accessToken")
      .populate("main.refreshToken")
      .populate("alts.accessToken")
      .populate("alts.refreshToken");
  }

  private getCharacter(user: UserDocument, characterEveId: number): Character {
    if (user.main.eveId === characterEveId) {
      return user.main;
    }

    const character = user.alts.find((alt) => alt.eveId === characterEveId);

    if (!character) {
      throw new InternalServerErrorException("Character not found.");
    }

    return character;
  }
}
