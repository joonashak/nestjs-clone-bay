import { SsoService } from "@joonashak/nestjs-eve-auth";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
    private ssoService: SsoService,
  ) {}

  async findAccessTokens(userId: string): Promise<EveAccessToken[]> {
    const { main, alts } =
      await this.userCacheService.findWithAccessTokens(userId);
    const characters = alts.concat(main);

    return characters.map(({ eveId, accessToken }) => ({
      eveId,
      accessToken,
    }));
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
