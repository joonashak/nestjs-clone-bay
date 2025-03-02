import { SsoService } from "@joonashak/nestjs-eve-auth";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CharacterDoesNotBelongException } from "../../exceptions/character-does-not-belong.exception";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";
import { UserService } from "./user.service";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
    private ssoService: SsoService,
    private userService: UserService,
  ) {}

  async findAccessTokensByUserId(userId: string): Promise<EveAccessToken[]> {
    const { main, alts } = await this.userService.findWithAccessTokens(userId);
    const characters = alts.concat(main);

    return characters.map(({ eveId, accessToken }) => ({
      eveId,
      accessToken,
    }));
  }

  async findAccessTokenByCharacterId(characterEveId: number): Promise<EveAccessToken> {
    const user = await this.userService.findByCharacterEveId(characterEveId);
    const tokens = await this.findAccessTokensByUserId(user.id);
    return tokens.find((t) => t.eveId === characterEveId);
  }

  /**
   * Get character's access token if given user owns it.
   *
   * A safe version of `TokenService.findAccessTokenByCharacterId`.
   */
  async findAccessTokenByCharacterIdSafe(
    characterEveId: number,
    userId: string,
  ): Promise<EveAccessToken> {
    const userOwnsCharacter = await this.userService.userOwnsCharacter(userId, characterEveId);

    if (!userOwnsCharacter) {
      throw new CharacterDoesNotBelongException();
    }

    return this.findAccessTokenByCharacterId(characterEveId);
  }

  /**
   * Refresh SSO tokens for character.
   *
   * New tokens are saved after refreshing and the new access token returned.
   */
  async refreshToken(characterEveId: number): Promise<string> {
    const user = await this.findUserWithRefreshTokens(characterEveId);
    const character = this.getCharacter(user, characterEveId);

    const tokens = await this.ssoService.refreshTokens(character.refreshToken);

    character.accessToken = tokens.accessToken;
    character.refreshToken = tokens.refreshToken;
    user.markModified("alts");
    await user.save();
    await this.userCacheService.invalidateForUser(user);

    return tokens.accessToken;
  }

  /**
   * Revoke all refresh tokens for user.
   */
  async revokeTokens(inputUser: User): Promise<void> {
    const user = await this.findUserWithRefreshTokens(inputUser.main.eveId);
    const refreshTokens = user.alts.map((alt) => alt.refreshToken);
    refreshTokens.push(user.main.refreshToken);
    await Promise.all(refreshTokens.map((token) => this.ssoService.revokeRefreshToken(token)));
    await this.userCacheService.invalidateForUser(user);
  }

  private async findUserWithRefreshTokens(characterEveId: number): Promise<UserDocument> {
    return this.userModel
      .findOne({
        $or: [{ "main.eveId": characterEveId }, { "alts.eveId": characterEveId }],
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
